import React, {useState} from "react";
import Layout from "../components/layout";
import Link from "next/link";


export default function RegForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [role, setRole] = useState('');

    let result = '';

    async function handleSubmit(event) {
        event.preventDefault();
                            
            const res = await fetch('/api/user-reg',
            {
                body: JSON.stringify({
                email: event.target.email.value,
                first: event.target.first.value,
                last: event.target.last.value,
                role: event.target.role.value
            }),

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        result = await res.json()
        console.log(result);
    }

    
    return (
            <Layout form>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input name='first' type='text' value={first} onChange={(e) => setFirst(e.target.value)} />
                    </label>
                    <label>
                        Last Name:
                        <input name='last' type='text' value={last} onChange={(e) => setLast(e.target.value)} />
                    </label>
                    <label>
                        Email:
                        <input name='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <label>
                        Repeat Password:
                        <input name='repeatPass' type='password' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                    </label>
                    <div value={role} onChange={(e) => setRole(e.target.value)}>
                        Role: 
                        <label>
                            Student
                            <input name='role' type='radio' value='student' />
                        </label>
                        <label>
                            Instructor
                            <input name='role' type='radio' value='instructor' />
                        </label>
                    </div>
                    <input type='submit' value='Register'/>
                </form>
                <div>
                    Already have an account? 
                    <Link href='/login'>
                        <a> Login</a>
                    </Link>
                </div>
                <h2>{result}</h2>
            </Layout>
        )
}

