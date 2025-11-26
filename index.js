const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = "mongodb+srv://zap_shift:owiaXGxzPPNIudBI@tanvir369.ymezqkm.mongodb.net/?appName=Tanvir369";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('this is my running server for zap-shift')
})


async function run() {
  try {

    await client.connect();

    const zap_shift = client.db("zap_shift")
    const collection = zap_shift.collection("parcel")


    app.get('/parcelInfo', async(req, res) =>{
        const query = {}


        const cursor = collection.find(query)
        const result= await cursor.toArray()
        res.send(result)
    })

    app.post('/parcelInfo', async(req, res) => {
        const newParcel = req.body;
        const result = await collection.insertOne(newParcel)
        res.send(result)
        console.log("the result is", result);
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// owiaXGxzPPNIudBI
// zap_shift