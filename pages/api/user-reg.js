import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    if (req.method === "POST") {
        const { db } = await connectToDatabase();
        const data = req.body;

        const key = { "email": data.email };

        const checker = db.collection('users')
            .countDocuments(key);

        if (checker !== 0) {
            res.json({msg:"User already exists"});
        } else {     
            const resp = await db.collection('users').insertOne(data);
        }
    }
};