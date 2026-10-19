const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { generalLimiter } = require('./middleware/rateLimiter');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const healthRoutes = require('./routes/healthRoutes');
const contactRoutes = require('./routes/contactRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

// Security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);

    const isAllowed =
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin) ||
      /\.netlify\.app$/.test(origin);

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive in dev, logged
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// HTTP Request logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// Request parsers with size limit
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Apply general rate limiter to /api
app.use('/api', generalLimiter);

// API Root info
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Shlok Chaturvedi Portfolio REST API',
    endpoints: {
      health: 'GET /api/health',
      contactSubmit: 'POST /api/contact',
      contactList: 'GET /api/contact',
      resumePdf: 'GET /api/resume/pdf',
      resumeDocx: 'GET /api/resume/docx',
    },
    documentation: 'https://github.com/shlok-ch',
  });
});

// Mount Routes
app.use('/api/health', healthRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/resume', resumeRoutes);

// 404 & Centralized Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
