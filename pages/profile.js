import Layout from "../components/layout";
import { getLoginSession } from "../lib/auth";
import { findUser } from "../lib/user";
import { useState } from "react";

export async function getServerSideProps(context) {
    const session = await getLoginSession(context.req)
    const user = (session && (await findUser(session.email))) ?? null
    if (user.role === 'instructor' ) {
        return {
            redirect: {
                permanent: false,
                destination: '/teacherProfile'
            }
        }
    }
    
    return { props: { user } }
}

function Profile({ user }) {
    const [course, setCourse] = useState('Course Code')
    
    const greeting = 'Welcome, ' + user.first
    
    const registerForCourse = (e) => {
        e.preventDefault();
        const addCourse = fetch('/api/addCourse', 
        {
            body: JSON.stringify(
            {
                user: user.email,
                code: course
            }),

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (res.status === 200) {
            alert('Course added!')
        } else {
            alert('There was an error.')
        }
    }

    return (
        <Layout>
            <h1>My Exambulance</h1>
            <div>
                <p>{greeting}!</p>
            </div>
            <div>
                <form onSubmit={registerForCourse}>
                    <label>
                        Register for a course: {'  '}
                        <input type='text' value={course} onChange={(e) => setCourse(e.target.value)} />
                        {'  '}
                    </label>
                        <input type='submit' value='Add Course' />
                </form>
            </div>        
            <button>
                <a href="/api/logout">Logout</a>
            </button>
            
        </Layout>
    )
}

export default Profile