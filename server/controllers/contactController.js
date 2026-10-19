const Contact = require('../models/Contact');
const { isDbConnected } = require('../config/db');

// Basic email regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

/**
 * @desc    Submit a new contact message
 * @route   POST /api/contact
 * @access  Public
 */
const submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Field existence validation
    const errors = [];
    if (!name || typeof name !== 'string' || !name.trim()) {
      errors.push({ field: 'name', message: 'Full name is required' });
    } else if (name.trim().length < 2) {
      errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
    } else if (name.trim().length > 100) {
      errors.push({ field: 'name', message: 'Name cannot exceed 100 characters' });
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      errors.push({ field: 'email', message: 'Email address is required' });
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errors.push({ field: 'email', message: 'Please provide a valid email address' });
    } else if (email.trim().length > 150) {
      errors.push({ field: 'email', message: 'Email cannot exceed 150 characters' });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      errors.push({ field: 'message', message: 'Message content is required' });
    } else if (message.trim().length < 10) {
      errors.push({ field: 'message', message: 'Message must be at least 10 characters long' });
    } else if (message.trim().length > 3000) {
      errors.push({ field: 'message', message: 'Message cannot exceed 3000 characters' });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please correct the highlighted errors.',
        errors,
      });
    }

    // Check if MongoDB is connected
    if (!isDbConnected()) {
      console.warn('⚠️  Contact submission attempted while MongoDB is offline.');
      return res.status(503).json({
        success: false,
        message: 'Database storage is temporarily offline. Please ensure MongoDB is running or try again shortly.',
      });
    }

    // Sanitize and capture metadata
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMessage = message.trim();
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';
    const userAgent = req.headers['user-agent'] || 'Unknown';

    const newContact = await Contact.create({
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      ipAddress: String(ipAddress).slice(0, 50),
      userAgent: String(userAgent).slice(0, 200),
    });

    console.log(`📬 New contact message received from: ${sanitizedName} <${sanitizedEmail}> [ID: ${newContact._id}]`);

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been saved and Shlok will get back to you shortly.',
      data: {
        id: newContact._id,
        name: newContact.name,
        email: newContact.email,
        createdAt: newContact.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all contact messages (for review/testing)
 * @route   GET /api/contact
 * @access  Internal/Testing
 */
const getContacts = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently offline.',
      });
    }

    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(50);
    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  getContacts,
};
