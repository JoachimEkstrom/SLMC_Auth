var express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const fetch = require("node-fetch")
require('dotenv').config()


router.post('/', function (req, res) {

    console.log(req.body)

    let body = {
        name: req.body.name,
        password: req.body.password
    }
    fetch(`${process.env.DBIP}${process.env.DBPORT}/users`, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(resf=> {
        console.log(resf.status)
        if (resf.status=== 200){
            let token = jwt.sign(body, process.env.ACCESS_TOKEN_SECRET)
            console.log(token)
            res.json({token: token})
        } else {
            res.sendStatus(resf.status)
        }
    
    
    })

    
})

// Test of token, gets all users.
router.get('/all', function (req, res) {

    console.log(req.headers)
    let token = req.headers.authorization 

    fetch(`http://localhost:${process.env.DBPORT}/users/all`, {
        method: 'get',
        headers: { 'authorization': token },
    })
    .then(resf=> resf.json())
    .then(json => {
        console.log(json)
        res.json(json)
    })  
})


module.exports = router