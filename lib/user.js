import { connectToDatabase } from "../util/mongodb";
const bcrypt = require('bcryptjs');


export async function createUser(body) {
    const saltRounds = 10;        
        
    const key = { "email": body.email };
    
    const { db } = await connectToDatabase();

    const checker = await db.collection('users')
        .countDocuments(key);
        
    if (checker !== 0) {
        res.json({msg:"User already exists"});
    } else {
        bcrypt.hash(body.password, saltRounds, function(err, hash) {
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

export async function findUser(email) {
    const { db } = await connectToDatabase();
    const query = { email: email}
    return await db.collection('users')
        .findOne(query, {projection: { 
            _id: 0, email: 1, password: 1, first: 1, last: 1, role: 1
            }
        });
}

export async function validatePassword(user, inputPassword) {
    const validate = await new Promise((resolve, reject) => {
        bcrypt.compare(inputPassword, user, function(err, res) {
            if (err) {
                reject(err)
            } else if (res === true) {
                resolve(res)   
            } else {
                reject
            }
        });
    })

    return validate;
}

export async function findCourses(key, value) {
    const { db } = await connectToDatabase();
    let query = ''
    key === 'instructor' ? query = { instructor: value } :
        query = { code: value }
    
    const courses = await db.collection('courses')
        .find(query, {projection: {
            _id: 0, name: 1, code: 1}
        }).toArray();
   
    return courses
}

export async function findMyCourses(userEmail) {
    const { db } = await connectToDatabase();
    
    const query = { email: userEmail }
    const myCourses = await db.collection('users')
        .findOne(query, {projection: {
            _id: 0, mycourses: 1}
        });
   
    return myCourses
}