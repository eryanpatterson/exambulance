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


export default async function Course( { course } ) {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['']);

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
                        A: {' '}
                        <input name="a" type="text" onChange={(e) => answers.push(e.target.value)} />
                        {' '}
                    </label>
                    <label>
                        B: {' '}
                        <input name="a" type="text" onChange={(e) => answers.push(e.target.value)} />
                        {' '}
                    </label>
                    <label>
                        C: {' '}
                        <input name="a" type="text" onChange={(e) => answers.push(e.target.value)} />
                        {' '}
                    </label>
                    <label>
                        D: {' '}
                        <input name="a" type="text" onChange={(e) => answers.push(e.target.value)} />
                        {' '}
                    </label>
                    <input type="submit" value="Add Prompt" />
                </form>
            </div>
        </Layout>
    )
}
