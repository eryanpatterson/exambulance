import { findCourses } from "../../lib/user";
import Layout from "../../components/layout";
import Link from "next/link"
import { useState } from "react";

export async function getServerSideProps({ params }) {
    console.log(params)
    let course = ''
    
    try { 
        const code = params.id
        course = await findCourses('code', code)
        
    } catch (error) {
        console.error(error);
    }
    console.log(course)
    //const courseInfo = await course.map(x => <div><h1>{x.code}</h1> <h2>{x.name}</h2> <p> This is a sample course description.</p></div>)
    return {
        props: {
            course
        }
    }
}


export default function Course( { course } ) {
    const [question, setQuestion] = useState('');
    const [numOfAnswers, setNum] = useState(1);
    const [answerInputs, setInputs] = useState('');
    const answers = [''];


    
    function handleChange(e) {
        setNum(numOfAnswers + 1)

        const answersPossible = [];
        
        for (let i = 0; i < numOfAnswers; i++) {
            answersPossible.push({ name: "Answer No. " + (i+2)})
        }

        setInputs(answersPossible.map(({ name }) => (
            <label>
                {name}: {' '}
                <input name={name} type="text" />
                <br />
            </label>
        ))
        )
    }

    const courseInfo = (<div><h1>{course[0].code}</h1> <h2>{course[0].name}</h2> </div>)

    async function handleSubmit(e) {
    e.preventDefault();

    const addPrompt = await fetch('/api/prompt',
            {
                body: JSON.stringify(
                {
                    course: course[0].code,
                    question: question,
                    answers: answers
                }),

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
    }
    
    return (
        <Layout>
            <div>{courseInfo}</div>
            <Link href="../profile"><a>Back</a></Link>
            <div>
                <h2>New Prompt</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Question: {' '}
                        <input name="question" type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
                        {' '}
                    </label>
                    <label>
                        Answer No. 1: {' '}
                        <input name="Answer No. 1" type="text" />
                    </label> 
                    <input name="numOfAnswers" type="button" value="+" onClick={handleChange} />
                    <br />
                    {answerInputs} 
                    <input type="submit" value="Add Prompt" />
                </form>
            </div>
        </Layout>
    )
}
