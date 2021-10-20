const express = require('express')
const userRouter = express.Router()
const axios = require('axios'); //Using to access json-server db
const db_url = require('../config.json').db_url
//---------------DB STUFF-----------------------//
//-------------------------------------------------//

// Handle GET request s to /api route
userRouter.get("/", async (req, res) => {
    resp = await axios.get(db_url + '/users/')
    console.log(resp.data)
    res.send(resp.data)
  });
  
// Create new User
userRouter.post("/", (req, res) => {
try {
    let body = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
    }
    resp = axios.post(db_url + '/users/', body).then((resp) => {
    console.log(resp.data);
    res.send(resp.data)
    })
} catch(err) {
    console.log(err)
    res.send(err)
}
});

// Update User Details
userRouter.put("/:id", async (req, res) => {
try {
    resp = await axios.put(db_url + '/users/' + req.params.id, {
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "email": req.body.email,
    })
    console.log(resp.data)
    res.send(resp.data)
} catch(err) {
    res.send(err)
}
});

// Delete User
userRouter.delete("/:id", async (req,res) => {
try {
    resp = await axios.delete(db_url + '/users/' + req.params.id)
    console.log(resp.data)
    res.send(resp.data)
} catch (err) {
    console.log(err)
    res.send(err)
}
})

module.exports = userRouter