import { findCourses } from "../../lib/user";
import Layout from "../../components/layout";
import Link from "next/link"

export async function getServerSideProps({ params }) {
    console.log(params)
    let course = ''
    
    try { 
        const code = params.id
        course = await findCourses('code', code)
        
    } catch (error) {
        console.error(error);
    }
    console.log(course)
    //const courseInfo = await course.map(x => <div><h1>{x.code}</h1> <h2>{x.name}</h2> <p> This is a sample course description.</p></div>)
    return {
        props: {
            course
        }
    }
}


export default function Course( { course }) {
    console.log(course)

    const courseInfo = (<div><h1>{course[0].code}</h1> <h2>{course[0].name}</h2> </div>)
    /* try { 
        const code = req.body.code
        const course = await findCourses('code', id)
        res.status(200).json({ course })
    } catch (error) {
        console.error(error);
    } */
    
    
    return (
        <Layout>
        <div>{courseInfo}</div>
        <Link href="../profile"><a>Back</a></Link>
        </Layout>
    )
}
