import * as express from 'express'
import {cwd} from 'process'
import {api} from './api'
import {authenticate, security} from './security'
const app = express()

app.use('/api', authenticate, api)
app.use(express.static('web/dist'))
app.use(express.static('static'))
app.use(security)
app.get('*', (req, res) => {
    res.sendFile(`${cwd()}/static/index.html`)
})

app.listen(4000)
