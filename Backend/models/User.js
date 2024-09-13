const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the User schema
const UserSchema = new Schema({
    name: { type: String, required: true }, 
    email: { type: String, unique: true, required: true }, 
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// Create the User model from the schema
const User = mongoose.model('User', UserSchema);

// Export the model for use in other parts of your application
module.exports = User;
