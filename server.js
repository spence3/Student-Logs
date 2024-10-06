const express = require('express');
const app = express();
const port = process.env.PORT || 8000
app.use(express.static('public'));
const path = require('path')
const courses = require('./routes/courses')


//set up static folder
app.use(express.static(path.join(__dirname,'public')))

//routes
app.use('/api/v1/courses', courses)


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
