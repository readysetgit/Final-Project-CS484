const express = require('express')
const authRouter = express.Router()
const axios = require('axios'); //Using to access json-server db
const db_url = require('../config.json').db_url

authRouter.post('/login', async (req, res) => {
    try {
        console.log(req.body.username)
        let resp = await axios.get(db_url + '/users?username=' + req.body.username)
        console.log(resp.data)
        res.send(resp.data)
    } catch(err) {
        console.log(err)
        res.send(err)
    }
})
// define the about route
authRouter.get('/signup', function (req, res) {
  res.send('About birds')
})

module.exports = authRouter