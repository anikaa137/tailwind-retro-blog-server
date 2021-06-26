const express = require('express')
const app = express()
const cors = require('cors');
const { MongoClient } = require('mongodb');


require('dotenv').config()
const port = process.env.PORT || 5000;
// console.log(process.env.DB_USER,process.env.DB_PASS,process.env.DB_NAME)

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('explore tailwind and make a retro blog!')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mivuu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {

  console.log('Are you there?', err)
  const adminCollection = client.db("retro-blog").collection("admin");
  const  blogsCollection = client.db("retro-blog").collection("blogs");

  console.log('database connected successfully')

  //make admin
  app.post('/makeAdmin', (req, res) => {
    // console.log(req);
    const user = req.body;
    // console.log('add a admin', user)
    adminCollection.insertOne(user)
      .then(result => {
        console.log('inserted conunt', result.insertedCount)
            res.send(result.insertedCount > 0)
        })
  })

// add Blog

  app.post('/addBlog', (req, res) => {
    const newBlog = req.body;
    console.log('add new ser',  newBlog)
    blogsCollection.insertOne(newBlog)
      .then(result => {
        console.log('inserted conunt', result.insertedCount)
        res.send(result.insertedCount > 0)
      })
  })

































































});

app.listen(port)