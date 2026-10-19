const express = require('express');
const router = express.Router();
const { downloadPdfResume, downloadDocxResume } = require('../controllers/resumeController');

// GET /api/resume/pdf - Download or stream PDF resume
router.get('/pdf', downloadPdfResume);

// GET /api/resume/docx - Download Word (.docx) resume
router.get('/docx', downloadDocxResume);

module.exports = router;
