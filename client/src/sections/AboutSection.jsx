import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, GraduationCap, Code2, Database, Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';

export default function AboutSection() {
  const highlights = [
    {
      icon: <Brain className="text-cyan-400" size={24} />,
      title: 'Machine Learning & Predictive Modeling',
      desc: 'Extensive hands-on dataset processing, model validation, and traffic congestion prediction.',
    },
    {
      icon: <Database className="text-indigo-400" size={24} />,
      title: 'Database Architecture & SQL',
      desc: 'Relational schema design, normalization, ACID compliance, and automated rule engines.',
    },
    {
      icon: <Code2 className="text-purple-400" size={24} />,
      title: 'FinTech & Software Systems',
      desc: 'Developing financial trend indicators, stock analytics dashboards, and scalable scripts.',
    },
  ];

  return (
    <section id="about" className="about-section section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <User size={14} /> About Me
          </span>
          <h2 className="section-title">
            Passionate About Building <span className="gradient-text">Data-Driven Systems</span>
          </h2>
          <p className="section-desc">
            Computer Science undergraduate at JK Lakshmipat University, Jaipur, combining analytical depth with software engineering.
          </p>
        </div>

        {/* About Grid */}
        <div className="about-grid">
          {/* Main Story Card */}
          <motion.div
            className="about-story-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="story-header">
              <div className="story-profile-badge">
                <GraduationCap size={28} className="text-cyan-400" />
              </div>
              <div>
                <h3 className="story-title">Undergraduate Profile</h3>
                <p className="story-meta">
                  <MapPin size={14} className="inline mr-1" />
                  {personalInfo.location} &bull; {personalInfo.institution} (2024 – Present)
                </p>
              </div>
            </div>

            <p className="story-paragraph">
              {personalInfo.summary}
            </p>

            <div className="story-details-list">
              <div className="story-detail-item">
                <span className="detail-label">Current Status:</span>
                <span className="badge badge-emerald">{personalInfo.status}</span>
              </div>
              <div className="story-detail-item">
                <span className="detail-label">Institution:</span>
                <span className="text-primary font-medium">{personalInfo.institution}</span>
              </div>
              <div className="story-detail-item">
                <span className="detail-label">Key Strengths:</span>
                <span className="text-secondary">Python, MySQL, Data Structures, Predictive ML, FinTech</span>
              </div>
            </div>
          </motion.div>

          {/* Highlights & Metrics Column */}
          <div className="about-highlights-col">
            {/* Quick Metrics Bar */}
            <div className="metrics-grid">
              {personalInfo.quickStats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="metric-box glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <span className="metric-value gradient-text">{stat.value}</span>
                  <span className="metric-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Core Competencies Cards */}
            <div className="competencies-stack">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  className="competency-card glass-card"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <div className="competency-icon">{h.icon}</div>
                  <div>
                    <h4 className="competency-title">{h.title}</h4>
                    <p className="competency-desc">{h.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
