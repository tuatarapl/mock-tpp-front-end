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
    const token = Buffer.from(JSON.stringify(req.user.username), 'UTF-8').toString('BAse64')
    Promise.all([
        axios.get(`/metadata/aspsps/${aspspId}`, {baseURL: 'http://localhost:3000'}),
        axios.get(`/consent/internal/request/${aspspId}`, {
            baseURL: 'http://localhost:3000',
            headers: {
                authorization: `Bearer ${token}`
            }
        }),
        axios.get(`/consent/internal/${aspspId}`, {
            baseURL: 'http://localhost:3000',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    ])
    .then(([{data: metadata}, {data: requests}, {data: consent}]) => res.send({...metadata, requests,consent}))
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
