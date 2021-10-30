const express = require('express')
require('dotenv').config()
const cors= require('cors')
const app = express()
const port= process.env.PORT || 5000
const { MongoClient } = require('mongodb');
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('assignment server is running SuccessFully')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yyhry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri, 'database connected successfully')









app.listen(port, ()=>{
    console.log('server is running on port', port)
})