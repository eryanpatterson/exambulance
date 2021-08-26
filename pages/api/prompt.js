import { findCourses } from "../../lib/user";
import { addPrompt } from "../../lib/prompts"

export default async function newPrompt(req, res) {
    const data = req.body
    const promptCourse = await findCourses('code', data.course)
    promptCourse[0].students.forEach(student => {
        data.student = student
        
        try {
            addPrompt(data);
            res.status(200).send({ done: true })
        } catch {
            console.error(error)
            res.status(500).send(error.message)
        }
    })
}