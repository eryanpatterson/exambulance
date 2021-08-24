import Router from "next/router";
import Layout from "../components/layout";
import { useState } from "react";
import Link from "next/link";
import { getLoginSession } from "../lib/auth";
import { findUser } from "../lib/user";

export async function getServerSideProps(context) {
    const session = await getLoginSession(context.req)
    const user = (session && (await findUser(session.email))) ?? null
    
    if (user == null) {
        Router.push('/login')
    }

    return { props: { user } }
}

export default function AddCourse( {user} ) {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        
        const newCourse = await fetch('/api/new-course', 
        {
                body: JSON.stringify(
                {
                    instructor: user.email,
                    name: name,
                    code: code
                }),

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
        }) 

        if (newCourse.status === 200) {
            Router.push('/profile')
        } else {
            throw new Error(newCourse.text())
        }
    } 

    return (
        <Layout>
            <h1>New Course</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Course Name: {' '}
                    <input name="name" type="text" value={name} onChange={(e) =>setName(e.target.value)} />
                    {'  '}
                </label>
                <label>
                    Course Code: {' '}
                    <input name="code" type="text" value={code} onChange={(e) =>
                    setCode(e.target.value)} />
                    {'  '}
                </label>
                <div> <input type="submit" value="Add Course" /> </div>
            </form>
            <Link href='/profile'><a>Go Back</a></Link>
        </Layout>
    )
}