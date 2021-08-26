import { findUser, findCourses } from "../../lib/user";
import { getLoginSession } from "../../lib/auth";
import Layout from "../../components/layout";
import Link from "next/link"
import { useState, useEffect } from "react";

export async function getServerSideProps(context) {
    const params = context.params;
    const session = await getLoginSession(context.req)
    const user = (session && (await findUser(session.email))) ?? null
    
    if (user == null) {
        return {
            redirect: {
                permanent: false,
                destination: '../login'
            }
        }
    }
    if (user.role !== 'instructor') {
        return {
            redirect: {
                permanent: false,
                destination: '../myCourses/' + params.id
            }
        }
    }

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

// Need to make changes so that prompt form refreshes when submitted and the answers array is set to empty.
// Need to handle error in case of courses with no students

export default function Course( { course } ) {
    const [question, setQuestion] = useState('');
    const [numOfAnswers, setNum] = useState(1);
    const [answerInputs, setInputs] = useState('');
    const [selector, setSelector] = useState('');
    const [correctAnswer, setCorrect] = useState('');
    let answers = [];

    const courseInfo = (<div><h1>{course[0].code}</h1> <h2>{course[0].name}</h2> </div>)

    useEffect(() => { for (let i = 1; i < numOfAnswers; i++) {
        answersPossible.push({ label: 'Answer ' + i, name: 'Ans' + i})
    } 
        setInputs(answersPossible.map(({ label, name }) => (
            <label key={name}>
                {label}: {' '}
                <input name={name} id={name} type="text" />
                <br />
            </label>
        ))
    )
        setSelector(
            <div value={correctAnswer} onChange={(e) => setCorrect(e.target.value)}>
            Correct Answer: {' '}
                {answersPossible.map( ({ label, name }) => (
                <label key={name}>
                    {label} : {' '}
                    <input name='Correct' type="radio" value={name} />
                    {' '}            
                </label>
            
                )

            )}
            </div> 
        ) 
        


    }, [numOfAnswers])
    
    const answersPossible = [];

    async function handleSubmit(e) {
        e.preventDefault();
        for (let i = 1; i < numOfAnswers; i++) {
            let ans = i;
            answers.push(document.getElementById('Ans' + ans).value)
        }

        const addPrompt = await fetch('/api/prompt',
            {
                body: JSON.stringify(
                {
                    course: course[0].code,
                    question: question,
                    answers: answers,
                    correct: correctAnswer
                }),

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        
        if (addPrompt.status === 500) {
            alert("An error occurred.")
        }
    }
    
    return (
        <Layout>
            <div>{courseInfo}</div>
            <Link href="../teacherProfile"><a>Back</a></Link>
            <div>
                <h2>New Prompt</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Question: {' '}
                        <input name="question" type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
                        {' '}
                    </label>
                    <br />
                    {answerInputs}
                    <input name="numOfAnswers" type="button" value="+" onClick={() => setNum(numOfAnswers +1)} />
                    <input name="numOfAnswers" type="button" value="-" onClick={() => setNum(numOfAnswers -1)} />
                    {selector}
                    <input type="submit" value="Add Prompt" />
                </form>
            </div>
        </Layout>
    )
}
