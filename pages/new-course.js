import Router from "next/router";
import Layout from "../components/layout";
import { useState } from "react";
import Link from "next/link";

export default function addCourse() {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const newCourse = await fetch('/api/new-course', 
        {
                body: JSON.stringify(
                {
                    name: e.target.name.value,
                    code: e.target.code.value
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
                    Course Name:
                    <input name="name" type="text" value={name} onChange={(e) =>setName(e.target.value)} />
                </label>
                <label>
                    Course Code:
                    <input name="code" type="text" value={code} onChange={(e) =>
                    setCode(e.target.value)} />
                </label>
                <input type="submit" value="Add Course" />
            </form>
            <Link href='/profile'><a>Go Back</a></Link>
        </Layout>
    )
}