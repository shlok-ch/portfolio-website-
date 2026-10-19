import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Database,
  Binary,
  Brain,
  Compass,
  Wrench,
  Terminal,
  Cpu,
  Server,
  Layers,
  Network,
  Workflow,
  Sparkles,
  BarChart3,
  Bot,
  Search,
  Layout,
  FileSpreadsheet,
  GitBranch,
  Globe,
  Info
} from 'lucide-react';
import { skillCategories } from '../data/skills';

// Helper mapping for Lucide icon components
const iconMap = {
  Code,
  Database,
  Binary,
  Brain,
  Compass,
  Wrench,
  Terminal,
  Cpu,
  Server,
  Layers,
  Network,
  Workflow,
  Sparkles,
  BarChart3,
  Bot,
  Search,
  Layout,
  FileSpreadsheet,
  GitBranch,
  Globe,
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCategories =
    activeCategory === 'All'
      ? skillCategories
      : skillCategories.filter((cat) => cat.category === activeCategory);

  return (
    <section id="skills" className="skills-section section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Code size={14} /> Technical Skills
          </span>
          <h2 className="section-title">
            Skills &amp; <span className="gradient-text">Core Competencies</span>
          </h2>
          <p className="section-desc">
            Organized into foundational theory, data analytics, systems engineering, and practical toolchains.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="skills-filter-pills">
          <button
            onClick={() => setActiveCategory('All')}
            className={`pill-btn ${activeCategory === 'All' ? 'active' : ''}`}
          >
            All Categories
          </button>
          {skillCategories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat.category)}
              className={`pill-btn ${activeCategory === cat.category ? 'active' : ''}`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="skills-categories-grid">
          {filteredCategories.map((catGroup, groupIdx) => {
            const GroupIcon = iconMap[catGroup.icon] || Code;

            return (
              <motion.div
                key={groupIdx}
                className="skill-category-card glass-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
              >
                {/* Category Header */}
                <div className="category-header">
                  <div className="category-icon-box">
                    <GroupIcon size={22} className="text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="category-title">{catGroup.category}</h3>
                    <p className="category-desc">{catGroup.description}</p>
                  </div>
                </div>

                {/* Skills In This Category */}
                <div className="skills-list">
                  {catGroup.skills.map((skill, sIdx) => {
                    const SkillIcon = iconMap[skill.icon] || Code;

                    return (
                      <div key={sIdx} className="skill-item-card">
                        <div className="skill-item-top">
                          <div className="skill-item-title-wrap">
                            <SkillIcon size={17} className="skill-item-icon" />
                            <span className="skill-name">{skill.name}</span>
                          </div>
                          <span className="badge badge-indigo skill-level-badge">
                            {skill.level}
                          </span>
                        </div>

                        <p className="skill-highlight">
                          <Info size={13} className="inline mr-1 text-cyan-400" />
                          {skill.highlight}
                        </p>

                        <div className="skill-tags">
                          {skill.tags.map((t, tIdx) => (
                            <span key={tIdx} className="badge badge-cyan skill-micro-tag">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
