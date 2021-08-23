import { findCourses } from "../../lib/user";
import Layout from "../../components/layout";
import Link from "next/link"

export async function getServerSideProps({ params }) {

    let course = ''
    
    try { 
        const code = params.course
        course = await findCourses('code', code)
        
    } catch (error) {
        console.error(error);
    }
    
    return {
        props: {
            course
        }
    }
}


export default function Course( { course } ) {
    const courseInfo = (<div><h1>{course[0].code}</h1> <h2>{course[0].name}</h2> </div>)

    return (
        <Layout>
            <div>{courseInfo}</div>
            <Link href="../profile"><a>Back</a></Link>
        </Layout>
    )
}
