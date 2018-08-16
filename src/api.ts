import axios from 'axios'
import {Router} from 'express'
export const api = Router()

api.get('/aspsps', (req, res) => {
    axios.get('/metadata/aspsps', {baseURL: 'http://localhost:3000'})
    .then(({data}) => res.send(data))
    .catch((error) => res.status(500).send())
})
