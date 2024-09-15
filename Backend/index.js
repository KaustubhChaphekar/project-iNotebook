const connectToMongo = require("./db");
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

connectToMongo();
const app = express();
const port = 3000;

const corsOptions = {
  origin: 'https://project-inotebook.onrender.com', // Your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'], // Allow auth-token header
};


// Enable CORS for all routes
app.use(cors(corsOptions));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Serve static files from the build folder (assuming you have the React build in the 'build' directory)
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route to serve index.html for client-side routes handled by React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html')); 
});

// Start server
app.listen(port, () => {
  console.log(`iNotebook listening on port ${port}`);
});
