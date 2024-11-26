const connectToMongo = require("./db");
const express = require('express')
const cors = require('cors')
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

connectToMongo();
const app = express()
const port = 3000;

const fs = require('fs');
console.log('Current directory structure:', fs.readdirSync(path.join(__dirname)));
console.log('Dist directory structure:', fs.readdirSync(path.join(__dirname, 'dist')));



const corsOptions = {
  origin: process.env.VITE_FRONTEND_URL || "http://localhost:5173", // Your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'], // Allow auth-token header
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Middleware to parse incoming JSON requests
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

const distPath = path.join(__dirname, 'dist', 'index.html');
if (!fs.existsSync(distPath)) {
    console.error('index.html not found at:', distPath);
} else {
    console.log('index.html exists at:', distPath);
}


// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to serve the index.html for any unknown routes
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath);
});


// Default route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, () => {
  console.log(`iNotebook listening on port ${port}`)
})