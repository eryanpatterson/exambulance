import Layout from "../components/layout";
import { getLoginSession } from "../lib/auth";
import { findUser } from "../lib/user";
import Router from "next/router";

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
            {user && (
                <div>
                    <p>{greeting}!</p>
                </div>
            )}
            <button>
                <a href="/api/logout">Logout</a>
            </button>
        </Layout>
    )
}

export default Profile