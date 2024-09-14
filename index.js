const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const task = require('./api/api');
const cors = require('cors');
const uri = "mongodb+srv://IonDolanescu:yhZlFcK5DXi0uj4a@cluster0.wlhcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));

// routes
app.use("/api/api", task);

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    app.listen(5000, () => {
      console.log("Servidor corriendo en Puerto 5000");
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);
