import * as express from 'express'
import {api} from './api'
const app = express()

app.use('/api', api)
app.use(express.static('web/dist'))
app.use(express.static('static'))
app.listen(4000)
