import { getLoginSession } from "../../lib/auth";
import { findUser } from "../../lib/user";

export default async function user(req, res) {
    try {
        const session = await getLoginSession(req)
        const user = (session && (await findUser(session.email))) ?? null
        console.log(user)
        res.status(200).json({ user })
    } catch (error) {
        console.error(error)
        res.status(500).end('Authentication token invalid; please log in')
    }
}