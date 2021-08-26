import { connectToDatabase } from "../../util/mongodb";

export default async function answerPrompt(req, res) {
    const { db } = await connectToDatabase();
    const data = req.body;

    try {
        const answer = db.collection('answered').insertOne(data);
        const removeQ = db.collection('prompts').deleteOne(
            { 
                course: data.course,
                student: data.student,
                question: data.question 
            }
        );
        res.status(200).send({ done: true });
    } catch {
        console.error(error)
        res.status(500).send(error.message)
    }
}