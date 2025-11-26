import clientPromise from '../lib/mongodb.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db('Dispo_db');
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
                const newAnimal = req.body;
                // Ensure count is integer
                newAnimal.count = parseInt(newAnimal.count);
                const result = await collection.insertOne(newAnimal);
                res.status(201).json({ ...newAnimal, id: result.insertedId.toString() });
            } catch (e) {
                res.status(500).json({ error: e.message });
            }
            break;

        case 'DELETE':
            try {
                const { id } = req.query;
                if (!id) {
                    return res.status(400).json({ error: 'ID is required' });
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
