import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Download, ArrowRight, Sparkles, MapPin, Terminal } from 'lucide-react';
import { Github, Linkedin } from '../components/SocialIcons';
import { personalInfo } from '../data/personalInfo';

export default function HeroSection({ onOpenResumeModal }) {
  // Typewriter effect state
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = personalInfo.typewriterRoles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing characters
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentFullText.length) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting characters
        setDisplayText(currentFullText.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % personalInfo.typewriterRoles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section section">
      {/* Background ambient lighting */}
      <div className="bg-glow-orb bg-glow-cyan" />
      <div className="bg-glow-orb bg-glow-indigo" />

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Text & CTAs */}
          <motion.div
            className="hero-text-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Status Pill */}
            <div className="hero-status-pill">
              <span className="status-indicator-dot" />
              <span>Available for Internships &bull; Jaipur, India</span>
            </div>

            {/* Greeting */}
            <h1 className="hero-headline">
              <span className="greeting-small">Hi, I'm</span>
              <span className="gradient-text hero-name">{personalInfo.name}</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              {personalInfo.role}
            </p>

            {/* Typewriter Banner */}
            <div className="hero-typewriter-box glass-card">
              <Terminal size={18} className="text-cyan-400" />
              <span className="typewriter-prefix">Focus:</span>
              <span className="typewriter-text">{displayText}</span>
              <span className="typewriter-cursor">|</span>
            </div>

            {/* Action Buttons */}
            <div className="hero-actions">
              <button
                onClick={() => scrollToSection('projects')}
                className="btn btn-primary"
                id="hero-explore-work-btn"
              >
                <span>Explore My Work</span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={onOpenResumeModal}
                className="btn btn-secondary"
                id="hero-download-resume-btn"
              >
                <Download size={17} />
                <span>Download Resume</span>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="btn btn-outline"
                id="hero-contact-btn"
              >
                <Mail size={17} />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Social Links & Location */}
            <div className="hero-footer-meta">
              <div className="hero-socials">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon"
                  aria-label="GitHub Profile"
                  title="View GitHub Profile"
                  id="hero-github-link"
                >
                  <Github size={20} />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon"
                  aria-label="LinkedIn Profile"
                  title="View LinkedIn Profile"
                  id="hero-linkedin-link"
                >
                  <Linkedin size={20} />
                </a>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="btn-icon"
                  aria-label="Email Shlok"
                  title="Send Email"
                  id="hero-email-link"
                >
                  <Mail size={20} />
                </a>
              </div>

              <div className="hero-location-tag">
                <MapPin size={16} className="text-cyan-400" />
                <span>{personalInfo.location} &bull; JK Lakshmipat University</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Avatar & Floating Cards */}
          <motion.div
            className="hero-visual-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="avatar-wrapper">
              <div className="avatar-ambient-glow" />
              <img
                src="/assets/avatar.svg"
                alt="Shlok Chaturvedi Avatar"
                className="hero-avatar-img animate-float"
                width="280"
                height="280"
              />

              {/* Floating Badge 1: Machine Learning */}
              <motion.div
                className="floating-card float-card-1 glass-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Sparkles size={16} className="text-cyan-400" />
                <div>
                  <span className="float-card-title">40M+ Traffic Records</span>
                  <span className="float-card-subtitle">PathFinder Pro ML</span>
                </div>
              </motion.div>

              {/* Floating Badge 2: Tech Stack */}
              <motion.div
                className="floating-card float-card-2 glass-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Terminal size={16} className="text-indigo-400" />
                <div>
                  <span className="float-card-title">Python &bull; MySQL &bull; ML</span>
                  <span className="float-card-subtitle">Data Structures &amp; DBMS</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
