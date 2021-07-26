import Local from 'passport-local'
import { findUser, validatePassword } from './user'

export const localStrategy = new Local.Strategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    function (
    username,
    password,
    done
    ) {
    
    findUser(username)
        .then((user) => {
            
            if (user && validatePassword(user.password, password)) {
                done(null, user)
            } else if (!user) {
                done( new Error('No user'))
            }
            else {
                done(new Error('Invalid email and password combination'))
            }
        })
        .catch((error) => {
            done(error)
        })
})