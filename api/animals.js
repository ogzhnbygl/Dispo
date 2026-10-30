import clientPromise, { getDbName } from '../lib/mongodb.js';
import { ObjectId } from 'mongodb';
import { verifyAuthWithStatus } from '../lib/auth.js';
import { z } from 'zod';

const animalPostSchema = z.object({
    species: z.string().min(1, 'Tür gereklidir.'),
    strain: z.string().min(1, 'Soy (strain) gereklidir.'),
    sex: z.string().min(1, 'Cinsiyet gereklidir.'),
    count: z.coerce.number().int().positive('Miktar pozitif bir tam sayı olmalıdır.'),
    dob: z.string().min(1, 'Doğum tarihi gereklidir.'),
    removalDate: z.string().min(1, 'Çıkarılma tarihi gereklidir.'),
    reason: z.string().min(1, 'Çıkarılma nedeni gereklidir.'),
    project: z.string().optional().default('-'),
    transferInstitution: z.string().nullable().optional()
});

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { user, status, error } = await verifyAuthWithStatus(req, 'dispo');
    if (!user) {
        return res.status(status || 401).json({ error: error || 'Unauthorized' });
    }

    const client = await clientPromise;
    const db = client.db(getDbName('Dispo_db'));
    const collection = db.collection('animals');

    switch (req.method) {
        case 'GET':
            try {
                const animals = await collection.find({}).sort({ removalDate: -1 }).toArray();
                // Convert _id to string id for frontend compatibility
                const formatted = animals.map(animal => ({
                    ...animal,
                    id: animal._id.toString()
                }));
                res.status(200).json(formatted);
            } catch (e) {
                res.status(500).json({ error: e.message });
            }
            break;

        case 'POST':
            try {
                const rawBatch = Array.isArray(req.body)
                    ? req.body
                    : Array.isArray(req.body?.items)
                    ? req.body.items
                    : null;

                if (rawBatch) {
                    if (rawBatch.length === 0) {
                        return res.status(400).json({ error: 'İçe aktarılacak kayıt dizisi boş olamaz.' });
                    }
                    if (rawBatch.length > 2000) {
                        return res.status(400).json({ error: 'Tek seferde en fazla 2000 kayıt aktarılabilir.' });
                    }

                    const validDocs = [];
                    let errorCount = 0;

                    for (const rawItem of rawBatch) {
                        const parsed = animalPostSchema.safeParse(rawItem);
                        if (parsed.success) {
                            validDocs.push(parsed.data);
                        } else {
                            errorCount++;
                        }
                    }

                    let insertedCount = 0;
                    if (validDocs.length > 0) {
                        const bulkRes = await collection.insertMany(validDocs, { ordered: false });
                        insertedCount = bulkRes.insertedCount ?? validDocs.length;
                    }

                    return res.status(201).json({
                        insertedCount,
                        errorCount
                    });
                }

                const validation = animalPostSchema.safeParse(req.body);
                if (!validation.success) {
                    return res.status(400).json({
                        error: validation.error.issues?.[0]?.message || 'Geçersiz kayıt verisi.'
                    });
                }
                const newAnimal = validation.data;
                const result = await collection.insertOne(newAnimal);
                res.status(201).json({ ...newAnimal, id: result.insertedId.toString() });
            } catch (e) {
                res.status(500).json({ error: e.message });
            }
            break;

        case 'DELETE':
            try {
                const { id } = req.query;
                if (!id || typeof id !== 'string' || !ObjectId.isValid(id)) {
                    return res.status(400).json({ error: 'Geçerli bir kayıt ID gereklidir.' });
                }
                await collection.deleteOne({ _id: new ObjectId(id) });
                res.status(200).json({ success: true });
            } catch (e) {
                res.status(500).json({ error: e.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
