const express = require('express');
const router = express.Router();
const { isDbConnected } = require('../config/db');

// GET /api/health - Health check endpoint
router.get('/', (req, res) => {
  const dbStatus = isDbConnected() ? 'connected' : 'disconnected';

  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Shlok Chaturvedi Portfolio API',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: dbStatus,
    },
    version: '1.0.0',
  });
});

module.exports = router;
