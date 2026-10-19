import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Calendar, Tag } from 'lucide-react';
import { Github } from './SocialIcons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <motion.div
          className="modal-content project-modal-content glass-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="modal-header">
            <div>
              <div className="project-category-tag">
                <Tag size={13} /> {project.category}
              </div>
              <h3 id="project-modal-title" className="modal-title">
                {project.title}
              </h3>
            </div>
            <button onClick={onClose} className="btn-icon modal-close-btn" aria-label="Close dialog">
              <X size={20} />
            </button>
          </div>

          <div className="project-modal-body">
            <div className="project-meta-bar">
              <span className="meta-item">
                <Calendar size={14} /> {project.date}
              </span>
              <span className="badge badge-cyan">{project.highlightMetric}</span>
              <span className="badge badge-emerald">{project.status}</span>
            </div>

            <div className="project-description-block">
              <h4>Overview</h4>
              <p>{project.detailedDescription}</p>
            </div>

            <div className="project-contributions-block">
              <h4>Key Contributions &amp; Implementation Details</h4>
              <ul className="contributions-list">
                {project.contributions.map((c, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="project-tech-block">
              <h4>Technologies &amp; Libraries</h4>
              <div className="tech-tags">
                {project.technologies.map((t, i) => (
                  <span key={i} className="badge badge-indigo">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="project-modal-actions">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <Github size={18} /> View on GitHub
                </a>
              )}
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <ExternalLink size={18} /> Live Demo
                </a>
              ) : (
                <span className="demo-notice text-secondary text-sm">
                  Verified Repository &bull; Live deployment in progress
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
