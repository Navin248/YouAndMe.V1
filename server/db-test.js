const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  console.log('Attempting to connect to MongoDB...');
  console.log('URI:', process.env.MONGODB_URI); // This will show your URI

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // These options help prevent older timeout errors
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 10s
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    console.log('✅ MongoDB connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Exit with failure
  } finally {
    // We can close the connection if it was successful, or just exit
    await mongoose.connection.close();
    console.log('Connection closed.');
  }
};

connectDB();