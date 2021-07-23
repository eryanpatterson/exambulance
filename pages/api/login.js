import { connectToDatabase } from '../../util/mongodb'

export default async function handler(req, res)  {
    const { db } = await connectToDatabase();
    const data = req.body;

    const query = { email: data.email}
    

    const userFind = await db.collection('users')
        .findOne(query, {projection: { 
            _id: 0, email: 1, password: 1
            }
        });

    console.log(userFind);
        


}