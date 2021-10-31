const express = require('express')
require('dotenv').config()
const cors= require('cors')
const app = express()
const port= process.env.PORT || 5000
const { MongoClient } = require('mongodb');
const ObjectId= require('mongodb').ObjectId
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('assignment server is running SuccessFully')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yyhry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri)
async function run(){
    try{
        await client.connect()
        const database= client.db('agencyService')
        const agencyCollection= database.collection('service')
        

        
      // get home api
      app.get('/home', async (req, res)=>{
          const cursor= agencyCollection.find({})
          const homeData= await cursor.toArray()
          res.send(homeData)
      } )

      // eta client site theke database e data pathacche
      app.post('/home', async (req, res)=>{
          const bookingAdded= req.body;
          const waiting= await agencyCollection.insertOne(bookingAdded)
        console.log('hitting',req.body)
        console.log('got booking',waiting)
        res.json(waiting)
      })
   
      app.get('/myBooking/:serviceId', async (req, res)=>{
            const bookingId= req.params.serviceId;
            const query= {_id:ObjectId(bookingId)}
            const getBook= await agencyCollection.findOne(query)
            console.log('booking loading', bookingId)
            res.send(getBook)
      })
    }
    finally{
        // await client.close()
    }

}
run().catch(console.dir)








app.listen(port, ()=>{
    console.log('server is running on port', port)
})