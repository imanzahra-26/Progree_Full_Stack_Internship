// About.jsx
// About section — fades in on scroll

import { motion } from 'framer-motion'   // ← Added

function About() {
  return (
    <motion.section
      className="about"
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="about-container container">

        {/* SECTION HEADING */}
        <div className="section-header">
          <p className="section-tag">Get to know me</p>
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="about-grid">
          <div className="about-text">
            <p>
              Hello! I'm <strong>Iman Zahra</strong>, a passionate full stack
              developer who loves turning ideas into clean, functional web
              applications. My journey started with HTML and CSS, and today
              I build complete projects using React, Node.js, Express.js, and
              MySQL.
            </p>
            <p>
              I'm currently completing a Full Stack Development internship
              where I'm building real-world projects — from student management
              systems to e-commerce platforms. I enjoy writing clean code,
              designing intuitive interfaces, and solving problems that
              actually matter.
            </p>
            <p>
              When I'm not coding, you'll find me learning new technologies,
              exploring UI design trends, or working on side projects that
              help me grow as a developer.
            </p>
          </div>

          <div className="about-card">
            <ul className="facts-list">
              <li>
                <span className="fact-icon">📍</span>
                <div>
                  <span className="fact-label">Location</span>
                  <span className="fact-value">Pakistan</span>
                </div>
              </li>
              <li>
                <span className="fact-icon">🎓</span>
                <div>
                  <span className="fact-label">Education</span>
                  <span className="fact-value">Computer Science</span>
                </div>
              </li>
              <li>
                <span className="fact-icon">💼</span>
                <div>
                  <span className="fact-label">Focus</span>
                  <span className="fact-value">Full Stack Development</span>
                </div>
              </li>
              <li>
                <span className="fact-icon">🚀</span>
                <div>
                  <span className="fact-label">Currently</span>
                  <span className="fact-value">Building portfolio projects</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default About