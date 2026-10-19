const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('⚠️  MONGODB_URI is not defined in environment variables. Database features will be disabled.');
    isConnected = false;
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    isConnected = false;
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('💡 Tip: Ensure MongoDB is running locally or provide a valid MongoDB Atlas connection string in server/.env');
  }

  mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.warn('⚠️  MongoDB disconnected.');
  });

  mongoose.connection.on('reconnected', () => {
    isConnected = true;
    console.log('🔄 MongoDB reconnected.');
  });
};

const isDbConnected = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

module.exports = {
  connectDB,
  isDbConnected,
};
