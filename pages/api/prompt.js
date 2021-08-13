import { connectToDatabase } from "../../util/mongodb";

export default async function newPrompt(req, res) {
    const { db } = await connectToDatabase();

    const data = req.body;

    try {
        const add = db.collection('prompts').insertOne(data);
        res.status(200).send({ done: true })
    } catch {
        console.error(error)
        res.status(500).send(error.message)
    }
}