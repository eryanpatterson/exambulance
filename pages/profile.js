import Layout from "../components/layout";
import Link from 'next/link';
import { getLoginSession } from "../lib/auth";
import { findMyCourses, findUser } from "../lib/user";
import { useState, useEffect } from "react";

export async function getServerSideProps(context) {
    const session = await getLoginSession(context.req)
    const user = (session && (await findUser(session.email))) ?? null
    const myCourses = (session && (await findMyCourses(session.email)))
    if (user == null) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }
    if (user.role === 'instructor' ) {
        return {
            redirect: {
                permanent: false,
                destination: '/teacherProfile'
            }
        }
    }
    
    return { props: { user, myCourses } }
}

function Profile({ user, myCourses }) {
    const [course, setCourse] = useState('Course Code')
    const [courseList, setList] = useState('Add some courses to see them here!')

    const greeting = 'Welcome, ' + user.first;
    
    useEffect(() => {
        myCourses.mycourses && setList(myCourses.mycourses.map(course => 
        <li key={course}>
            <Link href={'/courses/' + course}>
                <a><strong>{course}</strong></a>
            </Link>
        </li>));
    })

    async function registerForCourse(e) {
        e.preventDefault();
        const addCourse = await fetch('/api/addCourse', 
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

        if (addCourse.status === 200) {
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
                <Link href="/api/logout"><a>Logout</a></Link>
            </button>
            <ul>
                {courseList}
            </ul>
        </Layout>
    )
}

export default Profile