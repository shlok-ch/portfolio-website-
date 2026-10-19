import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import ResumeDownloadModal from '../components/ResumeDownloadModal';

import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import SkillsSection from '../sections/SkillsSection';
import ProjectsSection from '../sections/ProjectsSection';
import ResumeSection from '../sections/ResumeSection';
import EducationSection from '../sections/EducationSection';
import CertificationsSection from '../sections/CertificationsSection';
import ContactSection from '../sections/ContactSection';

export default function HomePage() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <div className="portfolio-app-root">
      {/* Sticky Navigation */}
      <Navbar onOpenResumeModal={() => setResumeModalOpen(true)} />

      {/* Main Content Sections */}
      <main id="main-content">
        <HeroSection onOpenResumeModal={() => setResumeModalOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ResumeSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenResumeModal={() => setResumeModalOpen(true)} />

      {/* Floating Scroll to Top */}
      <ScrollToTop />

      {/* Resume Download Modal */}
      <ResumeDownloadModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}
