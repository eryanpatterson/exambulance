import Link from "next/link";
import Layout from "../components/layout";


export default function Home() {

    return (
        <Layout>
            <h1>Hello Exambulance</h1>
            <Link href="/login">
                <a>Login</a>
            </Link>
            <br />
            <Link href="/register">
                <a>Register</a>
            </Link>
        </Layout>
    )
}