import * as express from 'express'
import {cwd} from 'process'
import {api} from './api'
import { callback } from './callback'
import {authenticate, security} from './security'
const app = express()

app.use(security)
app.use('/api', authenticate, api)
app.use('/callback', authenticate, callback)
app.use(express.static('web/dist'))
app.use(express.static('static'))
app.get('*', (req, res) => {
    res.sendFile(`${cwd()}/static/index.html`)
})

app.listen(4000)
