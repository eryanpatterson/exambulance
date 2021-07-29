import { connectToDatabase } from "../../util/mongodb";

export default async function newCourse(req, res) {
    const { db } = await connectToDatabase();
    
    const data = req.body
    // Need logic to add instructor name to course object
    try {
        const add = db.collection('courses').insertOne(data); 
        res.status(200).send({ done: true })
    } catch {
        console.error(error)
        res.status(500).end(error.message)
    }
}