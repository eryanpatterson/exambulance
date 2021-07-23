import Link from "next/link";
//import withSession from '../lib/session';
import Layout from "../components/layout";

export const getServerSideProps = withSession(async function ({ req, res}) {
    const user = req.session.get('user')

    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    return {
        props: { user },
    }
})

export default function Home() {
    return (
        <div>
            <h1>Hello Exambulance</h1>
            <Link href="/login">
                <a>Login</a>
            </Link>
            <Link href="/register">
                <a>Register</a>
            </Link>
        </div>
    )
}