const connectToMongo = require("./db");
const express = require('express')
const cors = require('cors')
require('dotenv').config(); // Load environment variables from .env file

connectToMongo();
const app = express()
const port = 3000

app.use(express.json())
app.use(cors({
  origin: "https://inotebook-vya3.onrender.com", // Replace with your actual frontend domain
  credentials: true, // Allow credentials to be included in requests
}));


app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNotebook listening on port ${port}`)
})

