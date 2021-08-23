import '../styles/globals.css'
import { useUser } from '../lib/hooks'

function MyApp({ Component, pageProps }) {

  useUser({ redirectTo: '/login', redirectIfFound: false })

  return <Component {...pageProps} />
}

export default MyApp
