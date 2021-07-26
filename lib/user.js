import { connectToDatabase } from "../util/mongodb";
const bcrypt = require('bcrypt');


export async function createUser(body) {
    const saltRounds = 10;        
        
    const key = { "email": body.email };
    
    const { db } = await connectToDatabase();

    const checker = await db.collection('users')
        .countDocuments(key);
        
    if (checker !== 0) {
        res.json({msg:"User already exists"});
    } else {
        await bcrypt.hash(body.password, saltRounds, function(err, hash) {
            const user = {
                email: body.email,
                password: hash,
                first: body.first,
                last: body.last,
                role: body.role
            };

                 
            const resp = db.collection('users').insertOne(user);

               
        });
    }
}

export async function findUser(body) {
    const { db } = await connectToDatabase();
    const query = { email: body.email}
    return await db.collection('users')
        .findOne(query, {projection: { 
            _id: 0, email: 1, password: 1
            }
        });
}

export function validatePassword(user, inputPassword) {
    bcrypt.compare(inputPassword, user.hash, (err, res) => {
        if (err) return callback(err);
        if (!res) return callback(new Error('Invalid password'));
    })
}