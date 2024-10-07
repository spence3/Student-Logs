const express = require('express');
const app = express();
const port = process.env.PORT || 8000
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

app.all('/*', (req, res) =>{
  res.status(404).send('<h1 style="color:red; text-align:center;">404 Page not found!</h1>');

})


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
