import Head from 'next/head'
import LoginForm from '../components/login-form'
import Layout from '../components/layout'
import Link from 'next/link'

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>      
      <LoginForm />      
      <div>
        No account yet? 
        <Link href='/register'>
          <a> Register</a>
        </Link>
      </div>
    </Layout>
  )
}