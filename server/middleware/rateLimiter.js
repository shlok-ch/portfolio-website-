const rateLimit = require('express-rate-limit');

// Rate limiter for contact form submissions (5 requests per 15 minutes per IP)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact submissions from this IP. Please wait 15 minutes before trying again.',
  },
});

// General API rate limiter (100 requests per 15 minutes per IP)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again later.',
  },
});

module.exports = {
  contactLimiter,
  generalLimiter,
};
