import * as bodyParser from 'body-parser'
import {Router} from 'express'
import * as session from 'express-session'
import * as passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
export const security = Router()
security.use(session({
    secret: 'keyboard cat'
}))
security.use(passport.initialize())
security.use(passport.session())

class User {
    public username: string
}

class InternalUser extends User {
    public password: string
}

const users: {
    [key: string]: InternalUser
} = {
    user1: {
        username: 'user1',
        password: 'password'
    }
}

function lookupUser(username): Promise < InternalUser > {
    const user = users[username]
    return user ? Promise.resolve(user) : Promise.reject()
}

function login(username, password): Promise < User | boolean > {
    return lookupUser(username).then((user) => {
        if (user && user.password === password) {
            return {
                username
            }
        } else {
            return false
        }
    }).catch(() => false)
}

passport.use(new LocalStrategy((username, password, done) => {
    login(username, password)
        .then((result) => done(null, result))
        .catch((error) => done(error))
}))

security.post('/login', bodyParser.urlencoded({
        extended: true
    }),
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
)

passport.serializeUser((user: User, done) => {
    done(null, user.username)
})

passport.deserializeUser((id, done) => {
    lookupUser(id)
        .then((user) => done(null, user))
        .catch((error) => done(error))
})

export const authenticate = passport.authenticate('local')
