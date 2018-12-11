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
        })
    ])
    .then(([{data: metadata}, {data: sessions}]) =>
        res.send({...metadata, sessions}))
    .catch((error) => res.status(500).send(inspect(error)))
})

api.put('/aspsps/:aspspId/sessions/:sessionId', json(), (req, res) => {
    const {aspspId, sessionId} = req.params
    const {consent} = req.body
    axios.post(`/session/${sessionId}`, {REQUESTED_CONSENT: consent, kind: 'polish-api-ais-redirect'},
        {
            baseURL,
            headers: {
                'x-tuatara-psu-id': req.user.username,
                'x-tuatara-aspsp-id': aspspId
            }
        })
    .then(({data}) => res.send(data))
    .catch((error) => res.status(500).send(inspect(error)))
})

api.get('/interactions', json(), (req, res) => {
    axios.get(`/interactions`,
        {
            baseURL,
            headers: {
                'x-tuatara-psu-id': req.user.username
            }
        })
    .then(({data}) => res.send(data))
    .catch((error) => res.status(500).send(inspect(error)))
})

api.post('/interactions/:interactionId/state', json(), (req, res) => {
    const {interactionId} = req.params

    const {state, event} = req.body
    axios.post(`/interactions/${interactionId}/state`, {state, event},
        {
            baseURL,
            headers: {
                'x-tuatara-psu-id': req.user.username
            }
        })
    .then(({data}) => res.send(data))
    .catch((error) => res.status(500).send(inspect(error)))
})

const operationMap = {
    getAccounts: '/v2_1.1/accounts/v2_1.1/getAccounts',
    getAccount: '/v2_1.1/accounts/v2_1.1/getAccount',
    getTransactionsDone: '/v2_1.1/accounts/v2_1.1/getTransactionsDone',
    getTransactionsPending: '/v2_1.1/accounts/v2_1.1/getTransactionsPending',
    getTransactionsRejected: '/v2_1.1/accounts/v2_1.1/getTransactionsRejected',
    getTransactionsScheduled: '/v2_1.1/accounts/v2_1.1/getTransactionsScheduled',
    getTransactionsCancelled: '/v2_1.1/accounts/v2_1.1/getTransactionsCancelled',
    getHolds: '/v2_1.1/accounts/v2_1.1/getHolds',
    getTransactionDetail: '/v2_1.1/accounts/v2_1.1/getTransactionDetail',
    domestic: '/v2_1.1/payments/v2_1.1/domestic',
    EEA: '/v2_1.1/payments/v2_1.1/EEA',
    nonEEA: '/v2_1.1/payments/v2_1.1/nonEEA',
    tax: '/v2_1.1/payments/v2_1.1/tax',
    bundle: '/v2_1.1/payments/v2_1.1/bundle',
    getPayment: '/v2_1.1/payments/v2_1.1/getPayment',
    getBundle: '/v2_1.1/payments/v2_1.1/getBundle',
    getMultiplePayments: '/v2_1.1/payments/v2_1.1/getMultiplePayments',
    cancelPayments: '/v2_1.1/payments/v2_1.1/cancelPayments'
}

api.post('/aspsps/:aspspId/call/:operation', json(), (req, res) => {
    const aspspId = req.params.aspspId
    const operation = req.params.operation
    const {session, payload} = req.body
    const headers = {}
    headers['x-tuatara-psu-id'] = req.user.username
    headers['x-tuatara-aspsp-id'] = aspspId
    if (session) {
        headers['x-tuatara-session-id'] = session
    }
    axios.post(`/integration${operationMap[operation]}`, payload, {
        baseURL,
        headers
    })
    .then(({data}) => res.send(data))
    .catch((error) => res.status(500).send(inspect(error)))
})
