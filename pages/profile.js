import Layout from "../components/layout";
import { getLoginSession } from "../lib/auth";
import { findUser } from "../lib/user";
import Router from "next/router";
import Link from "next/link";

export async function getServerSideProps(context) {
    const session = await getLoginSession(context.req)
    const user = (session && (await findUser(session.email))) ?? null
    
    if (user == null) {
        Router.push('/login')
    }

    return { props: { user } }
}

function Profile({ user }) {
    //const user =  useUser({ redirectTo: '/login'})
       
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
            </div>
            )}
        </Layout>
    )
}

export default Profile