const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



const decodedFB = Buffer.from(process.env.FIREBASE_TOKEN, 'base64').toString('utf8');
const serviceAccount = JSON.parse(decodedFB);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const verify = async (req, res, next) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Unauthorized Access' })
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized Access' })
  }
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
    next();
  }
  catch (error) {
    return res.status(401).send({ message: 'Unauthorized Access' })
  }
}

const verifyEmail = (req, res, next) => {
  if (req.query.email != req.decoded.email) {
    return res.status(401).send({ message: 'Unauthorized Access' })
  }
  next();
}
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@practice1.stkfhhm.mongodb.net/?retryWrites=true&w=majority&appName=practice1`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    const carCollection = client.db('zentraCar').collection('added-car');
    const bookingCollection = client.db('zentraCar').collection('booking');
    const usersCollection = client.db('zentraCar').collection('users');

    // all car related api here
    app.get('/cars', async (req, res) => {
      const home = req.query.home;
      const sortDate = req.query.sortDate;
      const sortPrice = req.query.sortPrice;
      const search = req.query.search;

      let filter = {};
      if (search && search.trim()) {
        const regex = new RegExp(search.trim(), 'i');
        filter = {
          $or: [
            { carName: regex },
            { carModel: regex },
            { location: regex }
          ]
        };
      }

      let cursor = carCollection.find(filter);

      if (home) {
        cursor = cursor.sort({ releaseDate: -1 }).limit(6);
      }

      if (sortDate == 'New') {
        cursor = cursor.sort({ releaseDate: -1 });
      } else if (sortDate == 'Old') {
        cursor = cursor.sort({ releaseDate: 1 });
      }

      if (sortPrice == 'Low') {
        cursor = cursor.sort({ dailyRentalPrice: 1 });
      } else if (sortPrice == 'High') {
        cursor = cursor.sort({ dailyRentalPrice: -1 });
      }

      const result = await cursor.toArray();

      res.send(result);
    })

    app.get('/myCars', verify, verifyEmail, async (req, res) => {
      const email = req.query.email;
      const query = { ownerEmail: email };
      const result = await carCollection.find(query).toArray();
      for (const car of result) {
        const id = car._id.toString();
        const query = { carID: id };
        const booking = await bookingCollection.countDocuments(query);
        car.bookingCount = booking;

      }
      res.send(result);
    })

    app.get('/car/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await carCollection.findOne(query);
      res.send(result);
    })

    app.post('/cars', async (req, res) => {
      const newCar = req.body;
      const result = await carCollection.insertOne(newCar);
      res.send(result);
    })

    app.put('/car/:id', async (req, res) => {
      const id = req.params.id;
      const updatedCar = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: updatedCar
      }
      const result = await carCollection.updateOne(query, updateDoc, options);
      res.send(result);
    })

    app.delete('/car/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await carCollection.deleteOne(query);
      res.send(result);
    })


    // all booking related api here
    app.get('/bookings', verify, verifyEmail, async (req, res) => {
      const email = req.query.email;
      const query = { userEmail: email };
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    })

    app.post('/bookings', async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    })

    app.patch('/booking/:id', async (req, res) => {
      const id = req.params.id;
      const bookingStartDate = req.body.bookingStartDate;
      const bookingEndDate = req.body.bookingEndDate;
      const bookingTime = req.body.bookingTime;
      const status = req.body.status;
      const updatedField = {};
      if (status) {
        updatedField.status = status
      } else {
        updatedField.bookingStartDate = bookingStartDate;
        updatedField.bookingEndDate = bookingEndDate;
        updatedField.bookingTime = bookingTime
      }
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: updatedField
      }
      const result = await bookingCollection.updateOne(query, updateDoc);
      res.send(result);
    })

    app.delete('/booking/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookingCollection.deleteOne(query);
      res.send(result);
    })

    app.get('/bookings/:id', async (req, res) => {
      const id = req.params.id;
      const query = { carID: id };
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    })


    // all users related api here
    app.get('/users', async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    })

    app.get('/user/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      res.send(result);
    })
    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    })
    app.patch('/user/:id/role', async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: user
      }
      const result = await usersCollection.updateOne(query, updateDoc);
      res.send(result);
    })
    app.patch('/user/:id', async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: user
      }
      const result = await usersCollection.updateOne(query, updateDoc);
      res.send(result);
    })

  } finally { }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})