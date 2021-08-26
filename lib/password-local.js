import Local from 'passport-local'
import { findUser, validatePassword } from './user'

export const localStrategy = new Local.Strategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    async function (username, password, done) {
    
        const user = await findUser(username);
        const validate = await validatePassword(user.password, password);
        console.log(validate)
        if (user && validate) {
            return done(null, user)
        } else if (!user) {
            done( new Error('No user'))
        }
        else {
            done(new Error('Invalid email and password combination'))
        }

            
})