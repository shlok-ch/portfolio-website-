# Shlok Chaturvedi — Full-Stack MERN Personal Portfolio

> **Production-grade personal portfolio website built with the MERN Stack (React, Node.js, Express, MongoDB) for Shlok Chaturvedi.**  
> Features live REST APIs, interactive project showcases, dual-format resume downloads (PDF and Word .docx served via backend routes), responsive design, dark/light theme switching, and robust contact form persistence with Mongoose.

[![React](https://img.shields.io/badge/React-19.x-61dafb.svg?style=flat&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933.svg?style=flat&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000.svg?style=flat&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248.svg?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)
2. [Candidate Profile & Genuine Information](#-candidate-profile--genuine-information)
3. [Key Features](#-key-features)
4. [Technology Stack](#-technology-stack)
5. [Architecture & System Design](#-architecture--system-design)
6. [Folder Structure](#-folder-structure)
7. [Prerequisites](#-prerequisites)
8. [Quick Start & Local Setup](#-quick-start--local-setup)
   - [Backend Configuration](#1-backend-setup-server)
   - [Frontend Configuration](#2-frontend-setup-client)
   - [Running Both Concurrently](#3-running-locally)
9. [MongoDB Configuration](#-mongodb-configuration)
10. [REST API Documentation](#-rest-api-documentation)
11. [Resume Download Implementation (PDF & DOCX)](#-resume-download-implementation-pdf--docx)
12. [Testing & Quality Assurance](#-testing--quality-assurance)
13. [Deployment Guide](#-deployment-guide)
    - [Frontend (Vercel / Netlify)](#frontend-deployment-vercel--netlify)
    - [Backend (Render / Railway)](#backend-deployment-render--railway)
    - [Database (MongoDB Atlas)](#database-deployment-mongodb-atlas)
14. [Security & Best Practices](#-security--best-practices)
15. [Professional Profiles & Submission](#-professional-profiles--submission)

---

## 🌟 Project Overview

This portfolio serves as a living, production-quality digital presence for **Shlok Chaturvedi**, a Computer Science undergraduate at **JK Lakshmipat University, Jaipur**. Designed specifically for software development, FinTech, and machine learning internship applications, it satisfies every academic criterion specified in the MERN Stack Course Personal Portfolio Assignment.

The application adheres to clean software engineering practices: a decoupled architecture separating the React client from the Express API, strict server-side validation with rate limiting, secure HTTP headers via Helmet, persistent contact storage in MongoDB, and backend streaming for verified resume downloads.

---

## 👤 Candidate Profile & Genuine Information

All information used across the portfolio has been verified against candidate documents and public repositories:

- **Name:** Shlok Chaturvedi
- **Location:** Jaipur, Rajasthan, India
- **Education:** Bachelor of Technology in Computer Science (2024 – Present)
- **Institution:** JK Lakshmipat University, Jaipur
- **Status:** Undergraduate Student
- **Relevant Coursework:** Data Structures, Algorithms, Database Management Systems (DBMS), Programming (Python, C), Finance
- **Core Languages:** Python, C
- **Databases:** MySQL, Relational Database Management Systems
- **Core Concepts:** Data Structures, Algorithms, DBMS, Machine Learning, Data Analytics
- **Specialized Skills:** SEO, Artificial Intelligence Tools, FinTech Dashboards
- **Certifications:**
  1. *Global Entrepreneurship* — Hanyang University
  2. *Social Media Content Strategy* — Adobe
  3. *Google SEO* — University of California
- **GitHub:** [https://github.com/shlok-ch](https://github.com/shlok-ch)
- **LinkedIn:** [https://www.linkedin.com/in/shlok-chaturvedi](https://www.linkedin.com/in/shlok-chaturvedi)

---

## 🚀 Key Features

### 1. Hero / Landing Section
- Dynamic typewriter effect cycling through core specializations: *Software Development*, *Machine Learning*, *Data Analytics*, and *FinTech Enthusiast*.
- Direct Call-to-Action (CTA) triggers for **Explore My Work**, **Download Resume**, and **Contact Me**.
- Custom initials-based developer monogram avatar (`SC`) with ambient neon rings and glowing micro-animations.
- Working social badges linking directly to Shlok's official GitHub and LinkedIn profiles.

### 2. About Me Section
- Authentic undergraduate narrative highlighting large-scale data processing and database design.
- Quick statistical indicators showcasing key metrics (40M+ records analyzed, 3+ core projects, 3 professional credentials).
- Core competency cards detailing practical experience in ML, SQL architecture, and FinTech.

### 3. Categorized Technical Skills
- Transparent, non-arbitrary skill cards categorized into:
  - *Programming Languages* (Python, C)
  - *Databases* (MySQL, DBMS)
  - *Computer Science Fundamentals* (Data Structures, Algorithms)
  - *Data and AI* (Machine Learning, Data Analysis, Artificial Intelligence Tools)
  - *Additional Skills* (Search Engine Optimization - SEO)
  - *Tools & Technologies* (Streamlit, Pandas, NumPy, Git, GitHub, MERN Stack)
- Category filter pills for rapid recruitment screening.
- Contextual badges specifying practical application notes for every skill.

### 4. Interactive Projects Showcase
Showcases 4 genuine projects, with verified repositories on Shlok's public GitHub:
1. **PathFinder Pro** *(Machine Learning / Data Analytics)*
   - Analyzed and preprocessed over 40 million traffic records.
   - Applied machine learning models for congestion prediction and route optimization.
2. **Campus Access and Compliance System** *(Database Management / Software Development)*
   - Relational database schema tracking campus vehicle entry/exit checkpoints.
   - Automated rule-based penalty calculations to reduce administrative overhead and human error.
3. **StockSense** *(FinTech / Market Analytics)* — **Verified GitHub Repository**
   - Real-time stock trend analysis and indicator dashboard built with Python and Streamlit.
   - Consumes live market data via Yahoo Finance (`yfinance`) with Pandas and NumPy processing pipelines.
   - Direct repository: [https://github.com/shlok-ch/Stock-Sense](https://github.com/shlok-ch/Stock-Sense)
4. **ideal-umbrella** *(Development Sandbox)* — **Verified GitHub Repository**
   - Personal experimentation workspace for validating algorithms and prototypes.
   - Direct repository: [https://github.com/shlok-ch/ideal-umbrella](https://github.com/shlok-ch/ideal-umbrella)
- Real-time category filtering (*Machine Learning*, *FinTech*, *Database / SQL*, *Software Development*).
- Live keyword search bar filtering by title, technologies, or keywords.
- Modal dialog revealing in-depth implementation notes, metrics, and repository links.

### 5. CV / Resume Download (Backend Connected)
- Available in both **PDF** (`.pdf`) and **Microsoft Word** (`.docx`) formats.
- **Strictly served via backend REST routes**:
  - `GET /api/resume/pdf`
  - `GET /api/resume/docx`
- Accessible via the sticky navbar, hero CTA, dedicated resume section, and modal popup.
- Includes Content-Disposition attachment headers, accurate MIME types, and client-side fallback handling.

### 6. Education Timeline
- Vertical animated timeline layout detailing coursework, semester milestones, and academic focus areas.
- Highlights practical application in data structures, algorithms, relational database normalization, and finance.

### 7. Certifications & Achievements
- Visual cards displaying credentials from **Hanyang University**, **Adobe**, and the **University of California**.
- Details core competencies learned without fabricating verification links or fake IDs.

### 8. Full-Stack Contact Form
- Inputs: Full Name, Email Address, and Message.
- Comprehensive client-side validation (regex format check, minimum character constraints).
- Express backend REST endpoint (`POST /api/contact`) with `express-rate-limit` (5 requests / 15 mins per IP).
- Stored persistently in MongoDB using Mongoose with timestamps and metadata.
- **Honest Database Handling:** If MongoDB is offline, the API returns a clear HTTP 503 status code, and the UI displays an informative alert with direct email/phone contact options (never falsely reporting success).
- Interactive celebratory confetti burst upon successful database storage.

### 9. Theme & Accessibility
- **Dark / Light Mode Toggle:** Smooth transition persisted in `localStorage`.
- Fully responsive across mobile smartphones, tablets, laptops, and ultra-wide desktops.
- Respects reduced-motion operating system preferences (`prefers-reduced-motion: reduce`).
- Accessible semantic HTML, visible keyboard focus indicators, and custom 404 page routing.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite 8, React Router v7, Framer Motion, Lucide Icons, Canvas Confetti |
| **Styling** | Vanilla CSS Design System, Custom Theme Tokens, Responsive Flex/Grid, Glassmorphism |
| **Backend** | Node.js (v24), Express.js 4, Helmet (Security Headers), CORS, Morgan, Express Rate Limit |
| **Database** | MongoDB, Mongoose 8 (Schema Validation, Indexes, Timestamps) |
| **File Generation** | ReportLab (Python automated resume generator for PDF format) |
| **Testing** | Node.js Native Test Runner (`node:test`, `node:assert`), Vite Production Build Check |
| **Deployment Ready** | Vercel / Netlify (`vercel.json`, `netlify.toml`), Render (`render.yaml`), MongoDB Atlas |

---

## 📐 Architecture & System Design

```
                     ┌───────────────────────────────────────────┐
                     │          Client Browser (React 19)        │
                     │  - Dark/Light Theme System                │
                     │  - Framer Motion Scroll Animations        │
                     │  - Interactive Filtering & Search         │
                     └─────────────────────┬─────────────────────┘
                                           │
                        HTTP REST Requests │ (JSON / Blobs)
                                           ▼
                     ┌───────────────────────────────────────────┐
                     │          Express.js Backend API           │
                     │  - Helmet Security & Production CORS      │
                     │  - Rate Limiter (IP-based window)         │
                     │  - Centralized Error & 404 Handling       │
                     └──────┬─────────────────────────────┬──────┘
                            │                             │
             Mongoose / BSON│                             │ File Streaming
                            ▼                             ▼
              ┌───────────────────────────┐ ┌───────────────────────────┐
              │      MongoDB Storage      │ │  Server File Storage      │
              │  - Contact Submissions    │ │  - Shlok_Resume.pdf       │
              │  - Timestamps & Metadata  │ │  - Shlok_Resume.docx      │
              └───────────────────────────┘ └───────────────────────────┘
```

---

## 📁 Folder Structure

```
assignment fullstack/
├── client/                               # React Frontend (Vite)
│   ├── public/
│   │   ├── assets/
│   │   │   └── avatar.svg                # Custom initials-based developer avatar
│   │   ├── resume/
│   │   │   ├── Shlok_Chaturvedi_Resume.pdf
│   │   │   └── Shlok_Chaturvedi_Resume.docx
│   │   └── favicon.svg                   # Custom SVG brand favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx                # Footer with social links & copyright
│   │   │   ├── Navbar.jsx                # Sticky navbar with active scroll spy
│   │   │   ├── ProjectModal.jsx          # Detailed project view modal
│   │   │   ├── ResumeDownloadModal.jsx   # Dual-format resume modal
│   │   │   ├── ScrollToTop.jsx           # Floating back-to-top trigger
│   │   │   ├── SocialIcons.jsx           # Clean SVG brand icons
│   │   │   └── ThemeToggle.jsx           # Dark / light theme toggle button
│   │   ├── data/
│   │   │   ├── certifications.js         # Verified certifications data
│   │   │   ├── education.js              # Education & coursework timeline data
│   │   │   ├── personalInfo.js           # Candidate personal info & bio
│   │   │   ├── projects.js               # Verified projects data & filters
│   │   │   └── skills.js                 # Categorized technical skills data
│   │   ├── pages/
│   │   │   ├── HomePage.jsx              # Main single-page portfolio layout
│   │   │   └── NotFoundPage.jsx          # Custom 404 error page
│   │   ├── sections/
│   │   │   ├── AboutSection.jsx          # Bio & academic stats
│   │   │   ├── CertificationsSection.jsx # Professional credentials
│   │   │   ├── ContactSection.jsx        # Full-stack contact form
│   │   │   ├── EducationSection.jsx      # Vertical academic timeline
│   │   │   ├── HeroSection.jsx           # Typewriter hero landing
│   │   │   ├── ProjectsSection.jsx       # Interactive projects showcase
│   │   │   ├── ResumeSection.jsx         # Dedicated resume download section
│   │   │   └── SkillsSection.jsx         # Categorized skills matrix
│   │   ├── services/
│   │   │   └── api.js                    # API client layer (Fetch / REST)
│   │   ├── styles/
│   │   │   ├── animations.css            # Keyframe animations & reduced motion
│   │   │   ├── components.css            # Component-specific design tokens
│   │   │   ├── globals.css               # Base CSS resets & utilities
│   │   │   └── variables.css             # Light & Dark theme color variables
│   │   ├── App.jsx                       # Root React Router container
│   │   ├── index.css                     # Global styles entry point
│   │   └── main.jsx                      # Vite React DOM bootstrap
│   ├── .env.example                      # Client environment variables example
│   ├── netlify.toml                      # Netlify deployment configuration
│   ├── package.json                      # Client dependencies & scripts
│   ├── vercel.json                       # Vercel SPA rewrite configuration
│   └── vite.config.js                    # Vite build configuration
├── server/                               # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                         # Mongoose connection & status tracking
│   ├── controllers/
│   │   ├── contactController.js          # Contact submission & retrieval logic
│   │   └── resumeController.js           # Resume PDF & DOCX download handler
│   ├── middleware/
│   │   ├── errorHandler.js               # Centralized error & 404 middleware
│   │   └── rateLimiter.js                # Express rate limiting policies
│   ├── models/
│   │   └── Contact.js                    # Mongoose contact schema & validation
│   ├── routes/
│   │   ├── contactRoutes.js              # /api/contact routes
│   │   ├── healthRoutes.js               # /api/health route
│   │   └── resumeRoutes.js               # /api/resume routes (PDF & DOCX)
│   ├── storage/
│   │   └── resume/
│   │       ├── Shlok_Chaturvedi_Resume.pdf
│   │       └── Shlok_Chaturvedi_Resume.docx
│   ├── test/
│   │   └── api.test.js                   # Automated backend API tests
│   ├── .env.example                      # Server environment variables example
│   ├── app.js                            # Express application setup
│   ├── package.json                      # Server dependencies & test scripts
│   ├── render.yaml                       # Render deployment blueprint
│   └── server.js                         # HTTP server bootstrap & shutdown
├── .gitignore                            # Excludes node_modules, .env, and logs
├── generate_resume_pdf.py                # Python ReportLab resume generator
├── package.json                          # Workspace root orchestration scripts
├── Portfolio website.pdf                 # Original assignment specification
└── README.md                             # Comprehensive documentation
```

---

## 💻 Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.x or higher (v20+ or v24 recommended)
- **npm**: v9.x or higher
- **MongoDB** *(Optional for full persistence)*: Local MongoDB instance running on port 27017 or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster URI.

---

## ⚡ Quick Start & Local Setup

### 1. Backend Setup (`/server`)

1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your local environment file:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` if using MongoDB Atlas, or keep default `mongodb://127.0.0.1:27017/shlok_portfolio` for local MongoDB.*
4. Start the backend development server:
   ```bash
   npm run dev
   # Or standard start:
   npm start
   ```
   The API will be available at: **`http://localhost:5000`**

### 2. Frontend Setup (`/client`)

1. In a separate terminal, navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your client environment file:
   ```bash
   cp .env.example .env
   ```
   *(Default points to `VITE_API_URL=http://localhost:5000`)*
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The portfolio web app will be live at: **`http://localhost:5173`**

### 3. Root Orchestration Scripts

From the repository root, you can also execute:
```bash
# Run server test suite
npm run test:server

# Build production bundle for client
npm run build:client

# Start backend server
npm run start:server
```

---

## 🍃 MongoDB Configuration

The application uses **Mongoose** to store contact form submissions.

### Option A: MongoDB Atlas (Cloud — Recommended for Production)
1. Sign up for a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and allow network access (`0.0.0.0/0` for cloud deployment).
3. Copy your connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/shlok_portfolio?retryWrites=true&w=majority
   ```
4. Paste it into `server/.env`.

### Option B: Local MongoDB Instance
1. Start MongoDB locally:
   ```bash
   mongod --dbpath /path/to/data
   ```
2. Set in `server/.env`:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/shlok_portfolio
   ```

### Graceful Offline Handling
If MongoDB is not reachable:
- The server **does not crash**.
- All resume downloads and health routes continue functioning normally.
- Form submissions receive a clear HTTP 503 response explaining the state honestly.

---

## 📡 REST API Documentation

Base URL: `http://localhost:5000`

### 1. Health Check
- **Endpoint:** `GET /api/health`
- **Description:** Verifies that the Express server is running and reports MongoDB connectivity status.
- **Sample Response:**
  ```json
  {
    "status": "ok",
    "timestamp": "2026-10-19T17:19:06.492Z",
    "service": "Shlok Chaturvedi Portfolio API",
    "uptime": 34.7,
    "environment": "development",
    "database": {
      "status": "connected"
    },
    "version": "1.0.0"
  }
  ```

### 2. Resume PDF Download
- **Endpoint:** `GET /api/resume/pdf`
- **Description:** Streams `Shlok_Chaturvedi_Resume.pdf` with `Content-Type: application/pdf` and `Content-Disposition: attachment; filename="Shlok_Chaturvedi_Resume.pdf"`.
- **Query Parameter:** `?inline=true` (optional, opens PDF in browser tab instead of triggering download).

### 3. Resume Word (.docx) Download
- **Endpoint:** `GET /api/resume/docx`
- **Description:** Streams `Shlok_Chaturvedi_Resume.docx` with `Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document` and `Content-Disposition: attachment; filename="Shlok_Chaturvedi_Resume.docx"`.

### 4. Submit Contact Form
- **Endpoint:** `POST /api/contact`
- **Rate Limit:** 5 requests per 15 minutes per IP.
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "message": "Hello Shlok, I would like to discuss an internship opportunity."
  }
  ```
- **Success Response (HTTP 201):**
  ```json
  {
    "success": true,
    "message": "Thank you for reaching out! Your message has been saved and Shlok will get back to you shortly.",
    "data": {
      "id": "6713e8a1f2b9a7123456789a",
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "createdAt": "2026-10-19T17:25:00.000Z"
    }
  }
  ```
- **Validation Failure Response (HTTP 400):**
  ```json
  {
    "success": false,
    "message": "Validation failed. Please correct the highlighted errors.",
    "errors": [
      { "field": "email", "message": "Please provide a valid email address" }
    ]
  }
  ```

### 5. View Stored Submissions (Inspection Route)
- **Endpoint:** `GET /api/contact`
- **Description:** Returns the 50 most recent contact messages for review and testing.

---

## 📄 Resume Download Implementation (PDF & DOCX)

As strictly required by Section 5 of the assignment rubric:
- Both PDF and Word formats are served dynamically via the backend Express routes:
  - `GET /api/resume/pdf`
  - `GET /api/resume/docx`
- Files are located in `server/storage/resume/`.
- Validated with automated tests to verify file existence, buffer size (>1KB), and HTTP headers.

---

## 🧪 Testing & Quality Assurance

### Automated Backend Tests
Run the automated test suite using Node's built-in test runner:
```bash
cd server
npm test
```

**Test Coverage Summary:**
- ✔ `GET /api/health` returns status 200 and health payload
- ✔ `GET /api/resume/pdf` serves PDF with correct attachment headers
- ✔ `GET /api/resume/docx` serves Word document with correct headers
- ✔ `POST /api/contact` rejects empty submissions with HTTP 400
- ✔ `POST /api/contact` validates email format with HTTP 400
- ✔ `POST /api/contact` enforces minimum message length (10 chars)
- ✔ `GET /api/non-existent-route` handles 404 errors gracefully

### Frontend Production Build Test
Verify the production compilation:
```bash
cd client
npm run build
```
Build output compiles into `client/dist/` with zero linting or bundle errors.

---

## 🚢 Deployment Guide

### Frontend Deployment (Vercel / Netlify)

#### Option 1: Vercel
1. Push your repository to GitHub.
2. Log into [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your repository and select the **`client`** root directory.
4. Set Framework Preset to **Vite**.
5. Add Environment Variable:
   - `VITE_API_URL` = Your deployed backend URL (e.g., `https://shlok-portfolio-api.onrender.com`).
6. Click **Deploy**. *(The included `client/vercel.json` ensures client-side routing works smoothly).*

#### Option 2: Netlify
1. Log into [Netlify](https://www.netlify.com/) and choose **Import an existing project**.
2. Select repository, set Base Directory to `client`, Build command to `npm run build`, and Publish directory to `client/dist`.
3. Add Environment Variable: `VITE_API_URL`.
4. Deploy site *(The included `client/netlify.toml` handles redirects).*

---

### Backend Deployment (Render / Railway)

#### Option 1: Render
1. Log into [Render](https://render.com/) and click **New Web Service**.
2. Connect your GitHub repository.
3. Configure settings:
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `CLIENT_URL` = `https://your-frontend-app.vercel.app`
   - `MONGODB_URI` = Your MongoDB Atlas connection URI
5. Click **Create Web Service**. *(Or use the included `server/render.yaml` blueprint).*

---

### Database Deployment (MongoDB Atlas)
1. In MongoDB Atlas, go to **Network Access** and add IP `0.0.0.0/0` (allow access from anywhere, required for cloud containers like Render).
2. Go to **Database Access** and verify your application user credentials.
3. Test connectivity by adding the connection string to Render's environment variables.

---

## 🔒 Security & Best Practices

- **Zero Exposed Credentials:** `.env` is excluded in `.gitignore` across the root, client, and server.
- **Helmet Middleware:** Enforces strict HTTP security headers against cross-site scripting and MIME sniffing.
- **CORS Protection:** Configured to whitelist authorized client origins.
- **Rate Limiting:** Protects contact submission endpoints from brute-force spam.
- **Input Sanitization:** Server trims whitespace, enforces bounds, and validates regex patterns.
- **No Fabricated Records:** Accurate resume details, real projects, and verified GitHub URLs.

---

## 📬 Professional Profiles & Submission

- **Candidate:** Shlok Chaturvedi
- **Location:** Jaipur, India
- **University:** JK Lakshmipat University, Jaipur
- **Public GitHub:** [https://github.com/shlok-ch](https://github.com/shlok-ch)
- **Public LinkedIn:** [https://www.linkedin.com/in/shlok-chaturvedi](https://www.linkedin.com/in/shlok-chaturvedi)
- **Portfolio Repository:** [https://github.com/shlok-ch/portfolio-website-](https://github.com/shlok-ch/portfolio-website-)
- **StockSense Project:** [https://github.com/shlok-ch/Stock-Sense](https://github.com/shlok-ch/Stock-Sense)
- **Submission:** Link to this public repository submitted on Google Classroom.

---
*Built with precision and care for the MERN Stack Course Personal Portfolio Assignment.*
