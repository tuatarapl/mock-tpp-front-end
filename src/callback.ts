import axios from 'axios'
import {raw} from 'body-parser'
import {Router} from 'express'
export const callback = Router()
callback.use('/:endpoint', raw(), (req, res) => {
    axios.post('/consent/internal/callback', {
        body: req.body,
        psuId: req.user.username,
        method: req.method.toLowerCase(),
        headers: req.headers,
        url: `${req.protocol}://${req.host}${req.originalUrl}`,
        endpoint: req.params.endpoint
    }, {baseURL: 'http://localhost:3000'})
    .then(({data}) => res.send(data))
    .catch((error) => res.status(500).send())
})
