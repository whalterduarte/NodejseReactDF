require('dotenv').config()
const cors = require('cors')
const fileupload = require('express-fileupload')
const mongoose = require('mongoose')
const express = require('express')
const path = require('path')

const apiRoutes = require('./routes/routes')

mongoose.connect(process.env.DATABASE)
.then(()=>{console.log('CONNECT BD: SUCCESS!')})
.catch((err)=>{console.log('ERROR BD', err)})

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error)=>{
    console.log("Error: ", error.message)
})

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileupload())

app.use(express.static(path.join(__dirname, '..', '/public')))

app.use('/', apiRoutes)

app.listen(process.env.PORT, ()=>{
    console.log("Rodando no endereço: "+process.env.BASE)
})