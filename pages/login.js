import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'
import {useState} from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks'


const Login = () => {
  useUser({ redirectTo: '/', redirectIfFound: true })

  const [errorMsg, setErrorMsg] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        Router.push('/')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error occurred: ', error)
      setErrorMsg(error.message)
    }
  }

  
  
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>      
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input name='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <div>  
          <label>
          Password:
          <input name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <div><input type="submit" value="Login" /></div>
      </form>      
      <div>
        No account yet? 
        <Link href='/register'>
          <a> Register</a>
        </Link>
      </div>
      {errorMsg && <p className="error">{errorMsg}</p>}
    </Layout>
  )
}

export default Login