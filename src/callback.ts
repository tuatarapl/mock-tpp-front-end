import axios from 'axios'
import {raw} from 'body-parser'
import {Router} from 'express'
export const callback = Router()

const baseURL = process.env.BACK_END_URL || 'http://localhost:8080'
const channel =  process.env.CHANNEL || 'front-end'
callback.use('/:endpoint', raw(), (req, res) => {
    axios.post(`/v2/channel/${channel}/psu/${req.user.username}/callback`, req.body, {
        baseURL,
        headers: {
            'x-original-uri': req.originalUrl,
            'x-original-method': req.method
        }
    })
    .then(({data}) => res.redirect('/callbackResult'))
    .catch((error) => res.status(500).send())
})
