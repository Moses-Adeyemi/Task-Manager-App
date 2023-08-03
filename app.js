// Importing required modules
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./db/connect');
// Importing the tasks route
const tasks = require('./routes/tasks');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


dotenv.config();
const app = express();

app.use(express.static('./public'))

// Middleware to parse JSON data in the request body
app.use(express.json());

// Middleware to allow Cross-Origin Resource Sharing (CORS)
app.use(cors());

// routes
app.use('/api/v1/tasks', tasks);
app.use(notFound)
app.use(errorHandlerMiddleware);


// Connect to the database
connectDB();

// Server configuration and start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
}).on('error', (error) => {
  console.error(`Error starting server: ${error.message}`);
});
