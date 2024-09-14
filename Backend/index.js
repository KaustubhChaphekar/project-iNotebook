const connectToMongo = require("./db");
const express = require('express')
const cors = require('cors')
require('dotenv').config(); // Load environment variables from .env file

connectToMongo();
const app = express()
const port = 3000

const corsOptions = {
  origin: 'https://project-inotebook.onrender.com', // Your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.options('*', cors(corsOptions)); // Enable pre-flight requests for all routes


app.use(express.json())


app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNotebook listening on port ${port}`)
})

