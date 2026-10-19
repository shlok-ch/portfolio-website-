import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Eye,
  Search,
  Sparkles,
  Layers
} from 'lucide-react';
import { Github } from '../components/SocialIcons';
import { projects, projectCategories } from '../data/projects';
import ProjectModal from '../components/ProjectModal';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter logic
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeFilter === 'All' ||
      project.categoryFilter === activeFilter ||
      project.technologies.includes(activeFilter);

    const matchesSearch =
      searchQuery.trim() === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="projects-section section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <FolderGit2 size={14} /> Projects Showcase
          </span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Engineering Projects</span>
          </h2>
          <p className="section-desc">
            Production-focused software, large-scale traffic prediction, database compliance management, and financial analytics.
          </p>
        </div>

        {/* Controls: Filter Pills & Search */}
        <div className="projects-controls">
          <div className="project-filter-pills">
            {projectCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveFilter(cat)}
                className={`pill-btn ${activeFilter === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="project-search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by title, tech, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="project-search-input"
              aria-label="Search projects"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="clear-search-btn"
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="projects-grid">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="project-card glass-card"
              >
                {/* Top Meta Bar */}
                <div className="card-top-bar">
                  <span className="badge badge-indigo">{project.category}</span>
                  <span className="project-date">
                    <Calendar size={13} className="inline mr-1" />
                    {project.date}
                  </span>
                </div>

                {/* Card Title & Headline */}
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.shortDescription}</p>

                {/* Metric Highlight Pill */}
                <div className="metric-pill">
                  <Sparkles size={14} className="text-cyan-400" />
                  <span>{project.highlightMetric}</span>
                </div>

                {/* Key Contributions Summary */}
                <div className="project-card-contributions">
                  <h4 className="contributions-header">Key Highlights:</h4>
                  <ul>
                    {project.contributions.slice(0, 2).map((item, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Badges */}
                <div className="project-card-tech">
                  {project.technologies.map((t, idx) => (
                    <span key={idx} className="badge badge-cyan tech-chip">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="project-card-footer">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="btn btn-secondary btn-sm"
                    aria-label={`View full details of ${project.title}`}
                  >
                    <Eye size={15} />
                    <span>View Details</span>
                  </button>

                  <div className="card-external-links">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon btn-sm"
                        aria-label={`GitHub Repository for ${project.title}`}
                        title="GitHub Repository"
                      >
                        <Github size={17} />
                      </a>
                    )}
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon btn-sm"
                        aria-label={`Live Demo for ${project.title}`}
                        title="Live Demo"
                      >
                        <ExternalLink size={17} />
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="no-projects-found glass-card">
            <Layers size={36} className="text-secondary mx-auto mb-2" />
            <p>No projects match your current filter or search criteria.</p>
            <button
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className="btn btn-outline btn-sm mt-3"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
