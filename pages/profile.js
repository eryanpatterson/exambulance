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
    
    // const myCourses = fetch('api/course-list', 
    //     {
    //         method: 'POST', 
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     })
    //     .then((res) => res.json())
    //     .then((data) => { return { courses: data.courses}})
        
    console.log(courses)
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
                <div></div>
            </div>
            )}
        </Layout>
    )
}

export default Profile