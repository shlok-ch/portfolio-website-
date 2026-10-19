import React from 'react';
import { motion } from 'framer-motion';
import { Award, Rocket, Megaphone, SearchCheck, CheckCircle, ShieldCheck } from 'lucide-react';
import { certifications } from '../data/certifications';

const certIconMap = {
  Rocket,
  Megaphone,
  SearchCheck,
  Award,
};

export default function CertificationsSection() {
  return (
    <section id="certifications" className="certifications-section section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Award size={14} /> Professional Credentials
          </span>
          <h2 className="section-title">
            Certifications &amp; <span className="gradient-text">Specializations</span>
          </h2>
          <p className="section-desc">
            Verified external certifications across entrepreneurship, digital media strategies, and search engine optimization.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="certifications-grid">
          {certifications.map((cert, index) => {
            const CertIcon = certIconMap[cert.icon] || Award;

            return (
              <motion.div
                key={cert.id}
                className="certification-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="cert-top-row">
                  <div className="cert-icon-box">
                    <CertIcon size={26} className="text-cyan-400" />
                  </div>
                  <span className="badge badge-indigo">{cert.category}</span>
                </div>

                <h3 className="cert-title">{cert.title}</h3>
                <h4 className="cert-issuer">
                  <ShieldCheck size={16} className="text-emerald-400 inline mr-1" />
                  {cert.issuer}
                </h4>

                <p className="cert-description">{cert.description}</p>

                <div className="cert-skills-wrap">
                  <span className="cert-skills-heading">Key Competencies:</span>
                  <div className="cert-skills-chips">
                    {cert.skillsCovered.map((skill, sIdx) => (
                      <span key={sIdx} className="badge badge-cyan cert-skill-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
