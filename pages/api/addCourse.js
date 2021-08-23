import { connectToDatabase } from "../../util/mongodb"; 

export default async function addCourse(req, res) {
    const { db } = await connectToDatabase();
    const body = req.body;

    try {
        db.collection('courses').findAndModify({
            query: { code: body.code },
            update: { $push: { students: body.user }}
        })
        
        res.status(200).send({ done: true })
    } catch (error) {
        console.error(error);
    }
}