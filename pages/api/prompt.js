import { addPrompt } from "../../lib/prompts"

export default async function newPrompt(req, res) {
    const data = req.body

    try {
        addPrompt(data);
        res.status(200).send({ done: true })
    } catch {
        console.error(error)
        res.status(500).send(error.message)
    }
}