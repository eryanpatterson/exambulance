import Layout from "../components/layout";
import { getLoginSession } from "../lib/auth";
import { findCourses, findUser } from "../lib/user";
import Link from "next/link";

export async function getServerSideProps(context) {
    const session = await getLoginSession(context.req)
    const user = (session && (await findUser(session.email))) ?? null
    const courses = (session && (await findCourses('instructor', session.email))) ?? null
    if (user === null) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }
    
    return { props: { user, courses } }
}

function teacherProfile({ user, courses }) {
    
    const courseList = courses.map(obj => (<li><Link href={'/courses/' + obj.code}><a><strong>{obj.code}</strong></a></Link> {obj.name}</li>) )

    let greeting = ''
    greeting = 'Welcome, Professor ' + user.last

    return (
        <Layout>
            <h1>My Exambulance</h1>
                <div>
                    <p>{greeting}!</p>
                </div>
            <button>
                <a href="/api/logout">Logout</a>
            </button>
            {user.role == "instructor" && (
            <div>
                <button>
                    <Link href='/new-course'><a>New Course</a></Link>
                </button>
                <div>{courseList}</div>
            </div>
            )}
        </Layout>
    )
}

export default teacherProfile