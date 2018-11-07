import axios from 'axios'
import {json} from 'body-parser'
import {Router} from 'express'
import { inspect } from 'util'
export const api = Router()

const baseURL = process.env.BACK_END_URL || 'http://localhost:8080'

api.get('/aspsps', (req, res) => {
    axios.get('/aspsps', {baseURL})
    .then(({data}) => res.send(data))
    .catch((error) => res.status(500).send(inspect(error)))
})

api.get('/aspsps/:aspspId', (req, res) => {
    const aspspId = req.params.aspspId
    const token = Buffer.from(JSON.stringify(req.user.username), 'UTF-8').toString('BAse64')
    Promise.all([
        axios.get(`/aspsps/${aspspId}`, {baseURL}),
        axios.get(`/session`, {
            baseURL,
            headers: {
                'x-tuatara-psu-id': req.user.username,
                'x-tuatara-aspsp-id': aspspId
            }
        })/*,
        axios.get(`/consent/internal/${aspspId}`, {
            baseURL: 'http://localhost:3000',
            headers: {
                authorization: `Bearer ${token}`
            }
        })*/
    ])
    .then(([{data: metadata}, {data: sessions}/*, {data: consent}*/]) =>
        res.send({...metadata, sessions /*, requests, consent*/}))
    .catch((error) => res.status(500).send(inspect(error)))
})

api.post('/aspsps/:aspspId/request', json(), (req, res) => {
    const aspspId = req.params.aspspId
    const {kind} = req.body
    axios.post('/consent/internal/request', {kind, aspspId, psuId: req.user.username},
        {baseURL: 'http://localhost:3000'})
    .then(({data}) => res.send(data))
    .catch((error) => res.status(500).send(inspect(error)))
})

api.post('/aspsps/:aspspId/call', json(), (req, res) => {
    const aspspId = req.params.aspspId
    const {kind} = req.body
    axios.post('/query/internal/accountsList', {kind, aspspId, psuId: req.user.username},
        {baseURL: 'http://localhost:3000'})
    .then(({data}) => res.send(data))
    .catch((error) => res.status(500).send(inspect(error)))
})
