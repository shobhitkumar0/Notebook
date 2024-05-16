// https://www.thunderclient.com/welcome
const connectToMongoose= require ('./db')
const express = require('express')
var cors=require('cors')
const app = express()
const port=5000
app.use(cors())
//to get request in json we use below express json 
app.use(express.json())
// respond with "hello world" when a GET request is made to the homepage
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port,()=>{
    console.log(`iNotebokk backend ,Listening to app at http://localhost:${port}`)
})

connectToMongoose();