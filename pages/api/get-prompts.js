import { getPrompts } from '../../lib/prompts'

export default async function fetchPrompts(req, res) {
    const data = req.body

    try {
        getPrompts(data.code);
        res.status(200).send({ done: true })
    } catch {
        console.error(error)
        res.status(500).send(error.message)
    }
}