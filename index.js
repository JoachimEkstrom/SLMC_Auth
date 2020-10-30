const express = require("express")
const app = express()
const login = require('./login.js')

require('dotenv').config()
const port = Number(process.env.PORT) 

app.use(express.json())

app.use("/login", login)


app.listen(port, ()=> {

    console.log(`Server running at http://localhost:${port}`)

})

