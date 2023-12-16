require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const mainRoutes = require('./router/v1/main.routes');


mongoose.connect(process.env.DB_URI);
const PORT = process.env.PORT;
const myDb = mongoose.connection;

myDb.on('error', console.error.bind(console, "connection error:"));
myDb.once("open", () => {

    // Check connection status
    console.log('Mongoose connection status:', mongoose.connection.readyState ? 'Connected to ' + myDb.name : 'Disconnected');
   
})

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
  });
  
  // Define the User model
  const User = mongoose.model('User', UserSchema);
  
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

app.use('/api', mainRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});