//import { connectToDatabase } from "../../util/mongodb";
import { createUser } from "../../lib/user";
const bcrypt = require('bcrypt');
 
export default async function register(req, res) {
    try {
        await createUser(req.body);
        res.status(200).send({ done: true })
    } catch (error) {
        console.error(error)
        res.status(500).end(error.message)
    }
}
/*export default async (req, res) => {
    if (req.method === "POST") {
        // Connecting to mongodb and getting data from registration page
        const { db } = await connectToDatabase();
        const data = req.body;
        
        // Hashing password
        const saltRounds = 10;
        const plainText = data.password;
        
        
        const key = { "email": data.email };
        
        const checker = await db.collection('users')
            .countDocuments(key);
        
        if (checker !== 0) {
            res.json({msg:"User already exists"});
        } else {
            await bcrypt.hash(plainText, saltRounds, function(err, hash) {
                const user = {
                    email: data.email,
                    password: hash,
                    first: data.first,
                    last: data.last,
                    role: data.role
                };

                 
                try {const resp = db.collection('users').insertOne(user);

                    res.redirect('/login') } catch {res.redirect('/register')}
            });
        }

    }
}; */