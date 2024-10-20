require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = process.env.PORT || 8000
const username = process.env.USERNAME
const password = process.env.PASSWORD
app.use(express.static('public'));
const path = require('path')
const courses = require('./routes/courses')
const logs = require('./routes/logs')

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//set up static folder
app.use(express.static(path.join(__dirname,'public')))

//routes
app.use('/api/v1/courses', courses)
app.use('/api/v1/logs', logs)

//404 page
app.all('/*', (req, res) =>{
  res.status(404).send('<h1 style="color:red; text-align:center;">404 Page not found!</h1>');

})

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ylg7v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    console.log('connected to database!')
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    }); 
  })
  .catch(() => {
    console.log('connection failed')
  })
// Start the server
