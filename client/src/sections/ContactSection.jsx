import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Phone,
  ShieldAlert
} from 'lucide-react';
import { Github, Linkedin } from '../components/SocialIcons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/personalInfo';
import { submitContact } from '../services/api';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // Live validation on change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for field once user edits
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name cannot exceed 100 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g., name@domain.com).';
    } else if (formData.email.trim().length > 150) {
      newErrors.email = 'Email cannot exceed 150 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message content is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    } else if (formData.message.trim().length > 3000) {
      newErrors.message = 'Message cannot exceed 3000 characters.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitResult(null);

    const clientErrors = validateForm();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitContact(formData);

      // Trigger celebratory confetti on real success
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (confettiErr) {
        // Confetti is a visual enhancement, ignore if blocked
      }

      setSubmitResult({
        type: 'success',
        title: 'Message Sent Successfully!',
        message: response.message || 'Thank you! Your message has been saved in MongoDB.',
      });

      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (err) {
      let title = 'Submission Could Not Be Completed';
      let message = err.message || 'Something went wrong while connecting to the server.';

      // Map backend validation errors if returned
      if (err.errors && Array.isArray(err.errors)) {
        const backendErrors = {};
        err.errors.forEach((e) => {
          backendErrors[e.field] = e.message;
        });
        setErrors(backendErrors);
      }

      if (err.status === 503) {
        title = 'Database Offline (MongoDB Not Connected)';
        message =
          'The Express server is reachable, but MongoDB database storage is currently offline. Please configure a valid MONGODB_URI in server/.env, or reach out directly via Email or LinkedIn.';
      } else if (err.isNetworkError) {
        title = 'Backend Server Unreachable';
        message =
          'Could not connect to the Express REST API on http://localhost:5000. Please start the backend server via `npm start` in the /server directory.';
      }

      setSubmitResult({
        type: 'error',
        title,
        message,
        status: err.status,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Mail size={14} /> Get in Touch
          </span>
          <h2 className="section-title">
            Let's Start a <span className="gradient-text">Conversation</span>
          </h2>
          <p className="section-desc">
            Seeking software engineering, ML, data analytics, or FinTech internships. Feel free to send a message!
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info & Social Channels */}
          <motion.div
            className="contact-info-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact-card glass-card">
              <h3 className="contact-card-title">Contact Information</h3>
              <p className="contact-card-subtitle">
                Feel free to connect directly via email, phone, or professional platforms.
              </p>

              <div className="contact-methods">
                <a href={`mailto:${personalInfo.email}`} className="contact-method-item">
                  <div className="method-icon-box">
                    <Mail size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <span className="method-label">Email Address</span>
                    <span className="method-value">{personalInfo.email}</span>
                  </div>
                </a>

                <a href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`} className="contact-method-item">
                  <div className="method-icon-box">
                    <Phone size={20} className="text-indigo-400" />
                  </div>
                  <div>
                    <span className="method-label">Phone / WhatsApp</span>
                    <span className="method-value">{personalInfo.phone}</span>
                  </div>
                </a>

                <div className="contact-method-item">
                  <div className="method-icon-box">
                    <MapPin size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <span className="method-label">Current Location</span>
                    <span className="method-value">{personalInfo.location}</span>
                  </div>
                </div>
              </div>

              <div className="contact-social-bar">
                <h4 className="social-bar-heading">Connect Online</h4>
                <div className="social-buttons-row">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    aria-label="GitHub Profile"
                  >
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              <div className="api-notice-box">
                <span className="badge badge-emerald mb-1">MERN Integration</span>
                <p className="text-xs text-secondary">
                  Submissions are sanitized, validated on client &amp; Express server, and stored in MongoDB using Mongoose with rate limiting.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            className="contact-form-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="contact-form glass-card" noValidate>
              <h3 className="form-card-title">Send a Message</h3>

              {/* Status Banner */}
              {submitResult && (
                <div
                  className={`form-status-banner ${submitResult.type === 'success' ? 'status-success' : 'status-error'}`}
                  role="alert"
                >
                  <div className="banner-icon-col">
                    {submitResult.type === 'success' ? (
                      <CheckCircle2 size={22} className="text-emerald-400 shrink-0" />
                    ) : submitResult.status === 503 ? (
                      <ShieldAlert size={22} className="text-amber-400 shrink-0" />
                    ) : (
                      <AlertCircle size={22} className="text-rose-400 shrink-0" />
                    )}
                  </div>
                  <div className="banner-text-col">
                    <h4 className="banner-title">{submitResult.title}</h4>
                    <p className="banner-message">{submitResult.message}</p>
                    {submitResult.type === 'error' && (
                      <div className="banner-fallback-actions">
                        <a
                          href={`mailto:${personalInfo.email}?subject=Inquiry%20from%20Portfolio&body=${encodeURIComponent(
                            formData.message || ''
                          )}`}
                          className="btn btn-sm btn-outline mt-2"
                        >
                          <Mail size={14} /> Send Directly via Email Client
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">
                  <span>Full Name</span>
                  <span className="text-xs text-secondary">Required</span>
                </label>
                <div className="input-wrap">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Alex Sharma"
                    className={`form-input has-icon ${errors.name ? 'is-invalid' : ''}`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.name && (
                  <span id="name-error" className="form-error">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">
                  <span>Email Address</span>
                  <span className="text-xs text-secondary">Required</span>
                </label>
                <div className="input-wrap">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g., alex@example.com"
                    className={`form-input has-icon ${errors.email ? 'is-invalid' : ''}`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <span id="email-error" className="form-error">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  <span>Your Message</span>
                  <span className="text-xs text-secondary">Min 10 characters</span>
                </label>
                <div className="input-wrap">
                  <MessageSquare size={18} className="input-icon textarea-icon" />
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hi Shlok, I would like to discuss an internship / project opportunity..."
                    className={`form-textarea has-icon ${errors.message ? 'is-invalid' : ''}`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.message && (
                  <span id="message-error" className="form-error">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary width-full submit-btn"
                disabled={isSubmitting}
                id="contact-submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span> Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message to Shlok
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
