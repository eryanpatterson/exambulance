import '../styles/globals.css'
import { useUser } from '../lib/hooks'
//import Router from 'next/router'

function MyApp({ Component, pageProps }) {

  useUser({ redirectTo: '/login', redirectIfFound: false })

  return <Component {...pageProps} />
}

export default MyApp
