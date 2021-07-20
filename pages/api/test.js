import { makePublicRouterInstance } from "next/dist/client/router";
import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    
    const data = {
            email: 'robert@mail.com',
            first: 'bob',
            last: 'rob',
            role: 'student'
    };

    console.log(data.email);
    //res.json({hi: "hello"});

    const key = { "email": data.email };

    const checker = await db.collection('users').countDocuments(key);
    console.log(checker);

    if (checker !== 0) {
        res.json({msg:"User already exists"});
    } else {
    
        const resp = await db.collection('users').insertOne(data);
    } 
};