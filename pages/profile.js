import Layout from "../components/layout";
import Link from 'next/link';
import { getLoginSession } from "../lib/auth";
import { findMyCourses, findUser } from "../lib/user";
import { useState, useEffect } from "react";
import { checkPrompts } from "../lib/prompts";

export async function getServerSideProps(context) {
    const session = await getLoginSession(context.req)
    const user = (session && (await findUser(session.email)))
    const myCourses = (session && (await findMyCourses(session.email)))
    if (!user.email) {
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

    const newPrompts = await checkPrompts(user.email)
    console.log(newPrompts)
    const promptCourses = newPrompts.map(obj => obj.course)
    
    return { props: { user, myCourses, promptCourses } }
}

function Profile({ user, myCourses, promptCourses }) {
    const [course, setCourse] = useState('');
    const [courseList, setList] = useState('Add some courses to see them here!');

    const greeting = 'Welcome, ' + user.first;
    console.log(promptCourses)
    useEffect(() => {
        myCourses.mycourses && setList(myCourses.mycourses.map(course =>  
            <li key={course}>
                <Link href={'/courses/' + course}>
                    <a><strong>{course}</strong></a>
                </Link>
                {promptCourses.includes(course) && <p>New prompts available!</p>}
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
            
            <form onSubmit={registerForCourse}>
                    <label>
                        Register for a course: {'  '}
                        <input name="course" type='text' onChange={(e) => setCourse(e.target.value)} />
                        
                        {'  '}
                    </label>
                        <input type='submit' value='Add Course' />
            </form>
                    
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