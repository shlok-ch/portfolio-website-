const express = require('express');
const router = express.Router();
const { submitContact, getContacts } = require('../controllers/contactController');
const { contactLimiter } = require('../middleware/rateLimiter');

// POST /api/contact - Rate limited submission
router.post('/', contactLimiter, submitContact);

// GET /api/contact - Review stored messages
router.get('/', getContacts);

module.exports = router;
