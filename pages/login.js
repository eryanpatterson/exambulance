import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'
import React, {useState} from 'react'


export default function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function handleSubmit(e) {
    e.preventDefault()

    const body = {
      email: e.target.email.value,
      password: e.target.password.value
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
    </Layout>
  )
}