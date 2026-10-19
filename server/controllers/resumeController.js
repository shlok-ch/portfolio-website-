const path = require('path');
const fs = require('fs');

const RESUME_DIR = path.join(__dirname, '..', 'storage', 'resume');

const downloadPdfResume = (req, res, next) => {
  const filename = 'Shlok_Chaturvedi_Resume.pdf';
  const filePath = path.join(RESUME_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: 'PDF resume file not found on server.',
    });
  }

  const isInline = req.query.inline === 'true';
  const disposition = isInline ? 'inline' : `attachment; filename="${filename}"`;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', disposition);

  return res.sendFile(filePath, (err) => {
    if (err && !res.headersSent) {
      return next(err);
    }
  });
};

const downloadDocxResume = (req, res, next) => {
  const filename = 'Shlok_Chaturvedi_Resume.docx';
  const filePath = path.join(RESUME_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: 'Word (.docx) resume file not found on server.',
    });
  }

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  return res.sendFile(filePath, (err) => {
    if (err && !res.headersSent) {
      return next(err);
    }
  });
};

module.exports = {
  downloadPdfResume,
  downloadDocxResume,
};
