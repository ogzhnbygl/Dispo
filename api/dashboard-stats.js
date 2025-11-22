import clientPromise from '../lib/mongodb.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const client = await clientPromise;
        const db = client.db('LabColonyDB');
        const collection = db.collection('animals');

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth(); // 0-indexed

        // Calculate start of year and start of month
        // The database stores dates as "YYYY-MM-DD" strings (from HTML date input)
        // So we should compare with strings in that format.

        const pad = (n) => n.toString().padStart(2, '0');

        const startOfYear = `${currentYear}-01-01`;
        const startOfMonth = `${currentYear}-${pad(currentMonth + 1)}-01`;

        // Aggregation pipeline
        const stats = await collection.aggregate([
            {
                $facet: {
                    "yearCount": [
                        {
                            $match: {
                                removalDate: { $gte: startOfYear }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                count: { $sum: "$count" } // Sum the 'count' field of each record
                            }
                        }
                    ],
                    "monthCount": [
                        {
                            $match: {
                                removalDate: { $gte: startOfMonth }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                count: { $sum: "$count" }
                            }
                        }
                    ],
                    "projectTerminationCount": [
                        {
                            $match: {
                                reason: "EXP-01"
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                count: { $sum: "$count" }
                            }
                        }
                    ]
                }
            }
        ]).toArray();

        const result = stats[0];

        res.status(200).json({
            year: result.yearCount[0]?.count || 0,
            month: result.monthCount[0]?.count || 0,
            projectTermination: result.projectTerminationCount[0]?.count || 0
        });

    } catch (e) {
        console.error("Dashboard stats error:", e);
        res.status(500).json({ error: e.message });
    }
}
