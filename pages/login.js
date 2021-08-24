import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'
import {useState} from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks'


const Login = () => {
  useUser({ redirectTo: '/profile', redirectIfFound: true })

  const [errorMsg, setErrorMsg] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      email: email,
      password: password,
    }

    try {
      const res = await fetch('/api/login', {
        body: JSON.stringify(body),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      if (res.status === 200) {
        Router.push('/profile')
      } else {
        throw new Error(await res.text())
          .then(setErrorMsg(Error))
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