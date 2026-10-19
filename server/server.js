const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

// Initialize Database connection
connectDB();

// Start Server
const server = app.listen(PORT, () => {
  console.log(`🚀 Portfolio REST API running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📄 Resume PDF:  http://localhost:${PORT}/api/resume/pdf`);
  console.log(`📝 Resume Word: http://localhost:${PORT}/api/resume/docx`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err.message);
  // Do not crash server in dev
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

// Graceful shutdown
const shutdown = () => {
  console.log('\nShutting down server gracefully...');
  server.close(() => {
    console.log('Server closed. Process terminated.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
