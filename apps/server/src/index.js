require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Plant = require('./models/Plant');
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./router/v1/auth.routes');
const plantRoutes = require('./router/v1/plant.routes');


mongoose.connect(process.env.DB_URI);
const PORT = process.env.PORT;
const myDb = mongoose.connection;

myDb.on('error', console.error.bind(console, "connection error:"));
myDb.once("open", () => {

    // Check connection status
    console.log('Mongoose connection status:', mongoose.connection.readyState ? 'Connected to ' + myDb.name : 'Disconnected');
   
})

  
// Define an async function to query the users collection
const getUsers = async () => {
    try {
      const users = await User.find();
      console.log('Users:', users);
    } catch (err) {
      console.error(err);
    }
  };

  getUsers();  


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api/plants', plantRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});