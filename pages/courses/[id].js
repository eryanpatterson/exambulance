import { findCourses } from "../../lib/user";
import Layout from "../../components/layout";
import Link from "next/link"
import { useState, useEffect } from "react";

export async function getServerSideProps({ params }) {
    
    let course = ''
    
    try { 
        const code = params.id
        course = await findCourses('code', code)
        
    } catch (error) {
        console.error(error);
    }
    
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
    const answers = [];

    const courseInfo = (<div><h1>{course[0].code}</h1> <h2>{course[0].name}</h2> </div>)
    
    useEffect(() => { for (let i = 1; i < numOfAnswers; i++) {
        answersPossible.push({ label: 'Answer ' + (i+2), name: 'Ans' + (i+2)})
    } 
        setInputs(answersPossible.map(({ label, name }) => (
            <label>
                {label}: {' '}
                <input name={name} id={name} type="text" />
                <br />
            </label>
        ))
    )


    }, [numOfAnswers])
    
    const answersPossible = [];

    async function handleSubmit(e) {
        e.preventDefault();

        for (let i = 0; i < numOfAnswers; i++) {
            let ans = i + 1;
            answers.push(document.getElementById('Ans' + ans).value)
        }
        
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
                        <input name="Ans1" id= "Ans1" type="text" />
                        {' '}
                    </label> 
                    <input name="numOfAnswers" type="button" value="+" onClick={() => setNum(numOfAnswers +1)} />
                    <input name="numOfAnswers" type="button" value="-" onClick={() => setNum(numOfAnswers -1)} />
                    <h2>{numOfAnswers}</h2>
                    <br />
                    {answerInputs} 
                    <input type="submit" value="Add Prompt" />
                </form>
            </div>
        </Layout>
    )
}
