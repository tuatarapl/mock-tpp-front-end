import * as bodyParser from 'body-parser'
import {Router} from 'express'
import * as session from 'express-session'
import * as passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import * as FileStore from 'session-file-store'
export const security = Router()
security.use(session({
    secret: 'keyboard cat',
    store: new (FileStore(session))({
        secret: 'keyboard cat'
    })
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

function mapUser({username}: InternalUser): User {
    return {
        username
    }
}

function login(username, password): Promise < User | boolean > {
    return lookupUser(username).then((user) => {
        if (user && user.password === password) {
            return mapUser(user)
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

export const authenticate = (req, res, next) => req.user ? next() : res.status(401).send()

security.get('/user', authenticate, (req, res) => res.send(req.user))

security.use(bodyParser.urlencoded({
    extended: true
}))

security.use(bodyParser.json())

security.post('/login', passport.authenticate('local', {}), (req, res) => res.send(req.user))

passport.serializeUser((user: User, done) => {
    done(null, user.username)
})

passport.deserializeUser((id, done) => {
    lookupUser(id)
        .then((user) => done(null, mapUser(user)))
        .catch((error) => done(error))
})
