import clientPromise from '../lib/mongodb.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: 'Proje etik numarası gereklidir.' });
    }

    try {
        const client = await clientPromise;
        // Connect specifically to LabProject_db database
        const db = client.db('LabProject_db');

        // Look up project by exact code/ethics number
        const project = await db.collection('projects').findOne({ code: code });

        if (!project) {
            return res.status(404).json({ error: 'Bu etik numarasına ait proje bulunamadı.' });
        }

        return res.status(200).json({
            title: project.title,
            pi: project.pi,
            code: project.code,
            protocol: project.protocol || '-',
            status: project.status
        });
    } catch (error) {
        console.error('Fetch project details error:', error);
        return res.status(500).json({ error: 'Proje bilgileri alınırken sunucu hatası oluştu.' });
    }
}
