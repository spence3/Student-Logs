const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
// Mock data for courses
const courses = [
  { id: 1, name: 'Course 1' },
  { id: 2, name: 'Course 2' },
  { id: 3, name: 'Course 3' }
];

// API endpoint to get courses
app.get('/api/v1/courses', (req, res) => {
  res.json(courses); // Respond with the courses array as JSON
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
