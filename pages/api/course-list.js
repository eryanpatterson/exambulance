import { findCourses } from "../../lib/user";
import { getLoginSession } from "../../lib/auth";

export default async function listCourses(req, res) {
    try {
        const session = await getLoginSession(req)
        const courses = (session && (await findCourses(session))) ?? null

        res.status(200).json({ courses })
    } catch (error) {
        console.error(error)
        res.status(500).end('Token invalid; please log in')
    }

}