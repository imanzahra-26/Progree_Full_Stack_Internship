// Projects.jsx
// Projects section — fades in + cards stagger

import { motion } from 'framer-motion'

function Projects() {
  // ============================================
  // FEATURED PROJECT
  // ============================================
  // HRMS is the featured one (live in production at Sadiq Group Ltd.)
  // githubLink is null → GitHub button will not render.
  const featured = {
    title: 'HRMS — Human Resource Management System',
    description:
      'A complete employee management system with modules for attendance, payroll, leave requests, and employee records. Built as a full-stack application with authentication and role-based access.',
    tech: ['Angular', '.NET Core', 'SQL Server', 'REST API'],
    liveLink: 'https://hrcore.sadiqgroupltd.com',
    githubLink: null, // company project — code is private
  }

  // ============================================
  // OTHER PROJECTS
  // ============================================
  // Each project may have:
  //   liveLink   — string URL, or null (button hidden)
  //   githubLink — string URL, or null (button hidden)
  const projects = [
    {
      title: 'Fake News Detector',
      description:
        'Machine learning model using SVM algorithm that classifies news articles as fake or real. Trained on a labeled dataset with text preprocessing and feature extraction.',
      tech: ['Python', 'SVM', 'Scikit-learn', 'NLP'],
      liveLink: null,      // no public demo
      githubLink: null,    // no public repo (FYP, kept private)
    },
    {
      title: 'Student Management System',
      description:
        'Full-stack CRUD application to manage student records — add, view, update, and delete students with a clean interface.',
      tech: ['React', 'Node.js', 'Express.js', 'MySQL'],
      liveLink: null,      // add Vercel URL later when deployed
      githubLink: 'https://github.com/imanzahra-26/student-management-system',
    },
    {
      title: 'Expense Tracker',
      description:
        'Track income and expenses with reports, category breakdowns, and user authentication.',
      tech: ['React', 'Node.js', 'Express.js', 'MySQL'],
      liveLink: null,
      githubLink: 'https://github.com/imanzahra-26/expense-tracker',
    },
    {
      title: 'ShopEase — E-Commerce Website',
      description:
        'Full-stack e-commerce platform with product catalog, shopping cart, JWT authentication, and order management using SQL transactions.',
      tech: ['React', 'Node.js', 'Express.js', 'MySQL', 'JWT'],
      liveLink: null,      // add Vercel URL after deployment
      githubLink: 'https://github.com/imanzahra-26/ecommerce-website',
    },
  ]

  // ============================================
  // HELPER — safely render a link only if it exists
  // ============================================
  // Returns true if the link is a real URL (not null, not '#', not empty)
  const hasLink = (link) => Boolean(link) && link !== '#'

  return (
    <motion.section
      className="projects"
      id="projects"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="projects-container container">

        {/* ---------- Section header ---------- */}
        <div className="section-header">
          <p className="section-tag">My Work</p>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>

        {/* ============================================
            FEATURED PROJECT CARD
            ============================================ */}
        <motion.div
          className="featured-project"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="featured-content">
            <span className="featured-badge">★ Featured</span>
            <h3 className="featured-title">{featured.title}</h3>
            <p className="featured-description">{featured.description}</p>

            {/* Tech stack tags */}
            <div className="tech-tags">
              {featured.tech.map((t, i) => (
                <span className="tech-tag" key={i}>{t}</span>
              ))}
            </div>

            {/* Action buttons — only render if a real link exists */}
            <div className="project-links">
              {hasLink(featured.liveLink) && (
                <motion.a
                  href={featured.liveLink}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Live Demo →
                </motion.a>
              )}

              {hasLink(featured.githubLink) && (
                <motion.a
                  href={featured.githubLink}
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  GitHub
                </motion.a>
              )}

              {/* If neither link exists — show subtle note (optional) */}
              {!hasLink(featured.liveLink) && !hasLink(featured.githubLink) && (
                <span className="project-note">Private project</span>
              )}
            </div>
          </div>
        </motion.div>

        {/* ============================================
            OTHER PROJECTS GRID
            ============================================ */}
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              className="project-card"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              {/* Tech stack tags */}
              <div className="tech-tags">
                {project.tech.map((t, i) => (
                  <span className="tech-tag" key={i}>{t}</span>
                ))}
              </div>

              {/* Project links — render only the ones that exist */}
              <div className="project-links">
                {hasLink(project.githubLink) && (
                  <a
                    href={project.githubLink}
                    className="project-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub →
                  </a>
                )}

                {hasLink(project.liveLink) && (
                  <a
                    href={project.liveLink}
                    className="project-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo →
                  </a>
                )}

                {/* If nothing exists — show subtle note instead of broken links */}
                {!hasLink(project.githubLink) && !hasLink(project.liveLink) && (
                  <span className="project-note">Private project</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  )
}

export default Projects