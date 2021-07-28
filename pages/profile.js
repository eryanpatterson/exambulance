import { useUser } from "../lib/hooks";
import Layout from "../components/layout";


const Profile = () => {
    const user = useUser({ redirectTo: '/login'})
    
    return (
        <Layout>
            <h1>My Exambulance</h1>
            {user && (
                <div>
                    <p>Hello, {user.first}!</p>
                </div>
            )}
            <button>
                <a href="/api/logout">Logout</a>
            </button>
        </Layout>
    )
}

export default Profile;