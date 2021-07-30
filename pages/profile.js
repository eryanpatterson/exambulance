import Layout from "../components/layout";
import { getLoginSession } from "../lib/auth";
import { findCourses, findUser } from "../lib/user";
import Link from "next/link";

export async function getServerSideProps(context) {
    const session = await getLoginSession(context.req)
    const user = (session && (await findUser(session.email))) ?? null
    const courses = (session && (await findCourses(session))) ?? null
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

function Profile({ user, courses }) {
    
    const courseList = courses.map(obj => (<li><strong>{obj.code}</strong>  {obj.name}</li>) )

    let greeting = ''
    
    if (user.role === 'instructor') {
        greeting = 'Welcome, Professor ' + user.last
    } else {
        greeting = 'Welcome, ' + user.first
    }
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

export default Profile