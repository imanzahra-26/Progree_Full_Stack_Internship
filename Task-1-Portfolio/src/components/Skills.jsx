// Skills.jsx
// Skills section — fades in on scroll, cards stagger in

import { motion } from 'framer-motion'   // ← Added

function Skills() {
  const skills = [
    { icon: '⚛️', name: 'React',      category: 'Frontend' },
    { icon: '🅰️', name: 'Angular',    category: 'Frontend' },
    { icon: '🧱', name: 'HTML5',      category: 'Frontend' },
    { icon: '🎨', name: 'CSS3',       category: 'Frontend' },
    { icon: '🟢', name: 'Node.js',    category: 'Backend' },
    { icon: '⚡', name: 'Express.js', category: 'Backend' },
    { icon: '🎯', name: '.NET',       category: 'Backend' },
    { icon: '💜', name: 'C#',         category: 'Backend' },
    { icon: '🐬', name: 'MySQL',      category: 'Database' },
    { icon: '🗄️', name: 'SQL Server', category: 'Database' },
    { icon: '📜', name: 'JavaScript', category: 'Language' },
    { icon: '🐍', name: 'Python ML',  category: 'Data Science' },
  ]

  return (
    <motion.section
      className="skills"
      id="skills"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="skills-container container">

        {/* SECTION HEADER */}
        <div className="section-header">
          <p className="section-tag">My Toolkit</p>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
        </div>

        {/* SKILLS GRID — each card staggers in */}
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              className="skill-card"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}   // ← Stagger
              viewport={{ once: true }}
            >
              <span className="skill-icon">{skill.icon}</span>
              <h3 className="skill-name">{skill.name}</h3>
              <p className="skill-category">{skill.category}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  )
}

export default Skills