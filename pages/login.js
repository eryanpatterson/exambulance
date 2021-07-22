import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'
import React, {useState} from 'react'
import useUser from '../lib/useUser'
import fetchJson from '../lib/fetchJson'


export default function Login() {
  const { mutateUser } = useUser({
    redirectTo: '/home',
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function handleSubmit(e) {
    e.preventDefault()

    const body = {
      email: e.target.email.value,
      password: e.target.password.value
    }

    try {
      mutateUser(
        await fetchJson('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      )
    } catch (error) {
      console.error('An unexpected error happened: ' , error)
      setErrorMsg(error.data.message)
    }
  }
  
  
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>      
      <form onSubmit={handleSubmit} errorMessage={errorMsg} >
        <label>
          Email:
          <input name='email' type='email' value={email} onChange={setEmail} />
        </label>
        <label>
          Password:
          <input name='password' type='password' value={password} onChange={setPassword} />
        </label>
        <input type="submit" value="Login" />
      </form>      
      <div>
        No account yet? 
        <Link href='/register'>
          <a> Register</a>
        </Link>
      </div>
    </Layout>
  )
}