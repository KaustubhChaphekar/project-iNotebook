const mongoose = require('mongoose');

// Use environment variable for MongoDB URI
const mongoURI = process.env.MONGODB_URI|| "mongodb://localhost:27017/inotebook?readPreference=primary";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectToMongo;

