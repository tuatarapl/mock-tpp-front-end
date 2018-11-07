import axios from 'axios'
import {raw} from 'body-parser'
import {Router} from 'express'
export const callback = Router()

const baseURL = process.env.BACK_END_URL || 'http://localhost:8080'
callback.use('/:endpoint', raw(), (req, res) => {
    axios.post('/callback', req.body, {
        baseURL,
        headers: {
            'x-tuatara-psu-id': req.user.username,
            'x-tuatara-endpoint': req.params.endpoint,
            'x-tuatara-original-url': req.originalUrl,
            'x-tuatara-original-method': req.method
        }
    })
    .then(({data}) => res.redirect('/callbackResult'))
    .catch((error) => res.status(500).send())
})
