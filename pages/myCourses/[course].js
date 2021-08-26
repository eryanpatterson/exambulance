import { findCourses } from "../../lib/user";
import Layout from "../../components/layout";
import Link from "next/link";
import { getPrompts } from "../../lib/prompts";
import { useUser } from '../../lib/hooks'
import { getLoginSession } from "../../lib/auth";

export async function getServerSideProps(context) {
    const { email } = await getLoginSession(context.req)
    const params = context.params;
    const code = params.course
    const coursePrompts = await getPrompts(code, email);

    let course = ''
    
    try { 
        course = await findCourses('code', code)
        
    } catch (error) {
        console.error(error);
    }
    
    return {
        props: {
            course, coursePrompts, email
        }
    }
}


export default function Course( { course, coursePrompts, email } ) {
    useUser({ redirectTo: '/login', redirectIfFound: false })
    
    const courseInfo = (<div><h1>{course[0].code}</h1> <h2>{course[0].name}</h2> </div>)

    function handleSubmit(e, question) {
        e.preventDefault();
        
        const submitAnswer = fetch('/api/answer',
            {
                body: JSON.stringify(
                {
                    course: course[0].code,
                    student: email,
                    question: question,
                    answer: e.target.answer.value
                }),

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
        })
    }
    
    const showPrompts = coursePrompts.map( obj => (
        <form key={obj.question} onSubmit={(e) => handleSubmit(e, obj.question)}>
            <h4>{obj.question}</h4>
            {obj.answers.map(ans => 
                <label key={ans}>
                    <input name="answer" type="radio" value={ans} />
                    {'  '} {ans}
                </label>
                )}
            <input type='submit' value='Submit' />
        </form>
    )
        
    )
    return (
        <Layout>
            <div>{courseInfo}</div>
            <Link href="../profile"><a>Back</a></Link>
            <div>
                {showPrompts}
            </div>
        </Layout>
    )
}
