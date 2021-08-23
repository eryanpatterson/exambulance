import { connectToDatabase } from "../util/mongodb";

export async function addPrompt(data) {
    const { db } = await connectToDatabase();
    const add = await db.collection('prompts').insertOne(data);
}

export async function getPrompts(course) {
    const { db } = await connectToDatabase();

    const query = {"course": course}
    const get = await db.collection('prompts')
        .find(query, { projection: {
            _id: 0, question: 1, answers: 1}
        }).toArray();

    return get;
}