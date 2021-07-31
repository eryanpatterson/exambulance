import { findCourses } from "../../lib/user";

export default async function getCourse(req, res) {
    try {
        const code = req.body.code
        const course = await findCourses('code', code)
        res.status(200).json({ course })
    } catch (error) {
        console.error(error);
    }
}