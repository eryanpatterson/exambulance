import { connectToDatabase } from "../util/mongodb";

export async function addPrompt(data) {
    const { db } = await connectToDatabase();
    const add = await db.collection('prompts').insertMany(data);
}

export async function getPrompts(course, student) {
    const { db } = await connectToDatabase();

    const query = {"course": course, "student": student}
    const get = await db.collection('prompts')
        .find(query, { projection: {
            _id: 0, question: 1, answers: 1}
        }).toArray();

    return get;
}