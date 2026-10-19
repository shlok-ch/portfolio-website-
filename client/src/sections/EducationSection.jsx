import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { educationData } from '../data/education';

export default function EducationSection() {
  return (
    <section id="education" className="education-section section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <GraduationCap size={14} /> Education Timeline
          </span>
          <h2 className="section-title">
            Academic <span className="gradient-text">Background &amp; Learning</span>
          </h2>
          <p className="section-desc">
            Formal coursework and foundational computer science principles studied at JK Lakshmipat University.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="timeline-container">
          <div className="timeline-line" />

          {educationData.map((item, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Timeline Marker Dot */}
              <div className="timeline-dot">
                <GraduationCap size={18} className="text-cyan-400" />
              </div>

              {/* Timeline Card */}
              <div className="timeline-card glass-card">
                <div className="timeline-card-header">
                  <div>
                    <span className="badge badge-emerald status-badge">{item.status}</span>
                    <h3 className="timeline-degree">{item.degree}</h3>
                    <h4 className="timeline-institution">{item.institution}</h4>
                  </div>
                  <div className="timeline-period-badge">
                    <Calendar size={14} className="inline mr-1" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <div className="timeline-location">
                  <MapPin size={14} className="inline mr-1 text-cyan-400" />
                  <span>{item.location}</span>
                </div>

                <p className="timeline-summary">{item.summary}</p>

                {/* Relevant Coursework */}
                <div className="coursework-block">
                  <div className="coursework-title">
                    <BookOpen size={16} className="text-cyan-400 inline mr-1" />
                    <span>Relevant Coursework:</span>
                  </div>
                  <div className="coursework-chips">
                    {item.coursework.map((course, cIdx) => (
                      <span key={cIdx} className="badge badge-indigo coursework-chip">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Academic Focus Points */}
                <div className="timeline-highlights">
                  <h5 className="highlights-heading">Key Focus Areas:</h5>
                  <ul>
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx}>
                        <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
