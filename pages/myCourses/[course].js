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
            course, coursePrompts
        }
    }
}


export default function Course( { course, coursePrompts } ) {
    useUser({ redirectTo: '/login', redirectIfFound: false })
    
    const courseInfo = (<div><h1>{course[0].code}</h1> <h2>{course[0].name}</h2> </div>)
    
    const showPrompts = coursePrompts.map( obj => (
        <form key={obj.question}>
            <h4>{obj.question}</h4>
            <ol>
                {obj.answers.map(ans => 
                <li key={ans}>
                    <label>
                        <input name={ans} type="radio" value={ans} />
                        {'  '} {ans}
                    </label>
                </li>
                )}
            </ol>
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
