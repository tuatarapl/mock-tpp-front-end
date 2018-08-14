import * as express from 'express'
import {api} from './api'
import {authenticate, security} from './security'
const app = express()

app.use('/api', authenticate, api)
app.use(express.static('web/dist'))
app.use(express.static('static'))
app.use(security)

app.listen(4000)
