import React from 'react';
import { Mail, Heart, Code, ArrowUp } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import { personalInfo } from '../data/personalInfo';

export default function Footer({ onOpenResumeModal }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-branding">
            <div className="brand-badge footer-logo">
              <span className="brand-initials">SC</span>
            </div>
            <div>
              <h3 className="footer-name">{personalInfo.name}</h3>
              <p className="footer-tagline">
                Computer Science Undergraduate &bull; Software Developer &bull; Jaipur, India
              </p>
            </div>
          </div>

          <div className="footer-social-links">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="btn-icon"
              aria-label="Email Shlok"
              title="Send an Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {currentYear} {personalInfo.name}. All rights reserved. JK Lakshmipat University, Jaipur.
          </p>

          <div className="footer-badges">
            <span className="badge badge-cyan">
              <Code size={13} /> MERN Full-Stack
            </span>
            <span className="badge badge-indigo">
              Python &bull; MySQL &bull; ML
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="footer-scroll-top-link"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
