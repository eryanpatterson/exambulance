import { connectToDatabase } from "../../util/mongodb"; 

export default async function addCourse(req, res) {
    const { db } = await connectToDatabase();
    const body = req.body;

    try {
        db.collection('courses').updateOne(
            { code: body.code },
            { $push: { students: body.user }}
        )
        db.collection('users').updateOne(
            { email: body.user },
            { $push: { mycourses: body.code }}
        )
        res.status(200).send({ done: true })
    } catch (error) {
        console.error(error);
    }
}