import axios from 'axios'
import {json} from 'body-parser'
import {Router} from 'express'
export const api = Router()

api.get('/aspsps', (req, res) => {
    axios.get('/metadata/aspsps', {baseURL: 'http://localhost:3000'})
    .then(({data}) => res.send(data))
    .catch((error) => res.status(500).send())
})

api.get('/aspsps/:aspspId', (req, res) => {
    const aspspId = req.params.aspspId
    Promise.all([
        axios.get(`/metadata/aspsps/${aspspId}`, {baseURL: 'http://localhost:3000'}),
        axios.get(`/consent/internal/request/${aspspId}`, {
            baseURL: 'http://localhost:3000',
            headers: {
                authorization: `Bearer ${Buffer.from(JSON.stringify(req.user.username), 'UTF-8').toString('BAse64')}`
            }
        })
    ])
    .then(([{data: metadata}, {data: requests}]) => res.send({...metadata, requests}))
    .catch((error) => res.status(500).send())
})

api.post('/aspsps/:aspspId/request', json(), (req, res) => {
    const aspspId = req.params.aspspId
    const {kind} = req.body
    axios.post('/consent/internal/request', {kind, aspspId, psuId: req.user.username},
        {baseURL: 'http://localhost:3000'})
    .then(({data}) => res.send(data))
    .catch((error) => res.status(500).send())
})
