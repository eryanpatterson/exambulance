import Link from "next/link";


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