const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
   console.log('MongoDB connected');
    
};

module.exports = connectDB;
