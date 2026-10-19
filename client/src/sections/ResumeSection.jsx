import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, FileCode, Download, CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { triggerResumeDownload } from '../services/api';

export default function ResumeSection() {
  const [downloading, setDownloading] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState(null);

  const handleDownload = async (format) => {
    setDownloading(format);
    setDownloadStatus({ type: 'loading', message: `Requesting ${format.toUpperCase()} from backend API...` });

    try {
      const res = await triggerResumeDownload(format);
      if (res.source === 'backend') {
        setDownloadStatus({
          type: 'success',
          message: `Successfully downloaded Shlok_Chaturvedi_Resume.${format} via backend route (/api/resume/${format})!`,
        });
      } else {
        setDownloadStatus({
          type: 'info',
          message: `Downloaded Shlok_Chaturvedi_Resume.${format} via client static fallback.`,
        });
      }
    } catch (err) {
      setDownloadStatus({
        type: 'error',
        message: `Download failed: ${err.message}`,
      });
    } finally {
      setDownloading(null);
    }
  };

  return (
    <section id="resume" className="resume-section section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <FileText size={14} /> Curriculum Vitae
          </span>
          <h2 className="section-title">
            Download My <span className="gradient-text">Resume / CV</span>
          </h2>
          <p className="section-desc">
            Served directly through dedicated Node.js and Express.js REST backend routes in both PDF and Word (.docx) formats.
          </p>
        </div>

        {/* Dual Format Cards */}
        <div className="resume-cards-container">
          {/* PDF Format Card */}
          <motion.div
            className="resume-download-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="resume-icon-circle pdf-circle">
              <FileText size={36} />
            </div>

            <div className="resume-card-info">
              <span className="badge badge-cyan">PDF Document</span>
              <h3 className="resume-file-title">Shlok_Chaturvedi_Resume.pdf</h3>
              <p className="resume-file-desc">
                Clean, ATS-optimized executive layout. Ideal for immediate review, application tracking systems, and digital printing.
              </p>
              <div className="resume-file-specs">
                <span>&bull; Size: ~4.1 KB</span>
                <span>&bull; Endpoint: <code>GET /api/resume/pdf</code></span>
              </div>
            </div>

            <button
              onClick={() => handleDownload('pdf')}
              className="btn btn-primary width-full"
              disabled={downloading === 'pdf'}
              id="resume-section-pdf-btn"
            >
              {downloading === 'pdf' ? (
                <>
                  <span className="animate-spin mr-1">⏳</span> Downloading PDF...
                </>
              ) : (
                <>
                  <Download size={18} /> Download PDF Resume
                </>
              )}
            </button>
          </motion.div>

          {/* Word (.docx) Format Card */}
          <motion.div
            className="resume-download-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="resume-icon-circle docx-circle">
              <FileCode size={36} />
            </div>

            <div className="resume-card-info">
              <span className="badge badge-purple">Microsoft Word</span>
              <h3 className="resume-file-title">Shlok_Chaturvedi_Resume.docx</h3>
              <p className="resume-file-desc">
                Original Word document (.docx). Useful for editable recruiter forms, internal enterprise submissions, and custom markup.
              </p>
              <div className="resume-file-specs">
                <span>&bull; Size: ~21.0 KB</span>
                <span>&bull; Endpoint: <code>GET /api/resume/docx</code></span>
              </div>
            </div>

            <button
              onClick={() => handleDownload('docx')}
              className="btn btn-secondary width-full"
              disabled={downloading === 'docx'}
              id="resume-section-docx-btn"
            >
              {downloading === 'docx' ? (
                <>
                  <span className="animate-spin mr-1">⏳</span> Downloading Word...
                </>
              ) : (
                <>
                  <Download size={18} /> Download Word (.docx)
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Live Feedback Banner */}
        {downloadStatus && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`resume-status-callout ${downloadStatus.type}`}
          >
            {downloadStatus.type === 'success' && <CheckCircle size={20} className="shrink-0" />}
            {downloadStatus.type === 'error' && <AlertCircle size={20} className="shrink-0" />}
            {downloadStatus.type === 'info' && <ShieldCheck size={20} className="shrink-0" />}
            {downloadStatus.type === 'loading' && <span className="animate-spin">⏳</span>}
            <span>{downloadStatus.message}</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
