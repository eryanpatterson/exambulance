import Link from "next/link";
import Layout from "../components/layout";


export default function Home() {

    const anObject = {
        this: 'is',
        an: 'object'
    }
    console.log(anObject);

    function handleClick() {
        anObject.add = 'hello';
        console.log(anObject)
    }
    return (
        <Layout>
            <h1>Hello Exambulance</h1>
            <Link href="/login">
                <a>Login</a>
            </Link>
            <button onClick={handleClick}>Hi there</button>
            <br />
            <Link href="/register">
                <a>Register</a>
            </Link>
        </Layout>
    )
}