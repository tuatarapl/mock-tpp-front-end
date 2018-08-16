import {Router} from 'express'

export const api = Router()

api.get('/aspsps', (req, res) => {
    res.send([{name: 'a', id: '1'}, {name: 'b', id: '2'}])
})
