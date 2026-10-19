import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, CheckCircle, AlertCircle, FileCode } from 'lucide-react';
import { triggerResumeDownload } from '../services/api';

export default function ResumeDownloadModal({ isOpen, onClose }) {
  const [downloadingFormat, setDownloadingFormat] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  if (!isOpen) return null;

  const handleDownload = async (format) => {
    setDownloadingFormat(format);
    setStatusMessage({ type: 'loading', text: `Fetching ${format.toUpperCase()} resume from backend API...` });

    try {
      const res = await triggerResumeDownload(format);
      if (res.source === 'backend') {
        setStatusMessage({
          type: 'success',
          text: `Success! ${format.toUpperCase()} resume downloaded via Node.js/Express backend route.`,
        });
      } else {
        setStatusMessage({
          type: 'info',
          text: `Downloaded ${format.toUpperCase()} resume via fallback copy (Backend offline).`,
        });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: `Download failed: ${err.message}`,
      });
    } finally {
      setDownloadingFormat(null);
    }
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="resume-modal-title">
        <motion.div
          className="modal-content glass-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="modal-header">
            <div>
              <h3 id="resume-modal-title" className="modal-title">
                Download Resume / CV
              </h3>
              <p className="modal-subtitle">
                Select your preferred format. Files are dynamically served via Express.js backend endpoints.
              </p>
            </div>
            <button onClick={onClose} className="btn-icon modal-close-btn" aria-label="Close dialog">
              <X size={20} />
            </button>
          </div>

          <div className="resume-grid">
            {/* PDF Option */}
            <div className="resume-card glass-card">
              <div className="resume-card-icon pdf-icon">
                <FileText size={32} />
              </div>
              <div className="resume-card-body">
                <h4>PDF Format</h4>
                <p className="text-secondary">Shlok_Chaturvedi_Resume.pdf</p>
                <div className="resume-meta">
                  <span className="badge badge-cyan">Standard PDF</span>
                  <span className="badge badge-indigo">Served via GET /api/resume/pdf</span>
                </div>
              </div>
              <button
                className="btn btn-primary btn-sm width-full"
                onClick={() => handleDownload('pdf')}
                disabled={downloadingFormat === 'pdf'}
                id="modal-download-pdf-btn"
              >
                {downloadingFormat === 'pdf' ? (
                  <>
                    <span className="animate-spin mr-1">⏳</span> Downloading...
                  </>
                ) : (
                  <>
                    <Download size={16} /> Download PDF
                  </>
                )}
              </button>
            </div>

            {/* DOCX Option */}
            <div className="resume-card glass-card">
              <div className="resume-card-icon docx-icon">
                <FileCode size={32} />
              </div>
              <div className="resume-card-body">
                <h4>Word Format (.docx)</h4>
                <p className="text-secondary">Shlok_Chaturvedi_Resume.docx</p>
                <div className="resume-meta">
                  <span className="badge badge-purple">Microsoft Word</span>
                  <span className="badge badge-indigo">Served via GET /api/resume/docx</span>
                </div>
              </div>
              <button
                className="btn btn-secondary btn-sm width-full"
                onClick={() => handleDownload('docx')}
                disabled={downloadingFormat === 'docx'}
                id="modal-download-docx-btn"
              >
                {downloadingFormat === 'docx' ? (
                  <>
                    <span className="animate-spin mr-1">⏳</span> Downloading...
                  </>
                ) : (
                  <>
                    <Download size={16} /> Download Word (.docx)
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`download-status-banner ${statusMessage.type}`}
            >
              {statusMessage.type === 'success' && <CheckCircle size={18} />}
              {statusMessage.type === 'error' && <AlertCircle size={18} />}
              {statusMessage.type === 'info' && <CheckCircle size={18} />}
              {statusMessage.type === 'loading' && <span className="animate-spin">⏳</span>}
              <span>{statusMessage.text}</span>
            </motion.div>
          )}

          <div className="modal-footer">
            <span className="api-note">
              Endpoints: <code>GET /api/resume/pdf</code> &bull; <code>GET /api/resume/docx</code>
            </span>
            <button className="btn btn-outline btn-sm" onClick={onClose}>
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
