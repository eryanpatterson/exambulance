import { findCourses } from "../../lib/user";
import { addPrompt } from "../../lib/prompts"

export default async function newPrompt(req, res) {
    const data = req.body
    const promptCourse = await findCourses('code', data.course)
    const studentList = promptCourse[0].students;
    
    if (!studentList) {
        res.status(500).send({message: "No students in this course yet!"})
    } else {

        function Prompt(initial, student) {
            this.course = initial.course;
            this.question = initial.question;
            this.answers = initial.answers;
            this.correct = initial.correct;
            this.student = student;
        }

        const promptSet = [data];

        for (let i = 0; i < studentList.length; i++) {
            promptSet.push(
                new Prompt(data, studentList[i])    
            );
        }

        try {
            addPrompt(promptSet);
            res.status(200).send({ done: true })
        } catch {
            console.error(error)
            res.status(500).send(error.message)
        }
    }
}