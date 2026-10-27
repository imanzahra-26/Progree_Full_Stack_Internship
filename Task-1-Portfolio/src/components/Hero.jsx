// Hero.jsx
// Clean hero section — fades in on page load

import { motion } from 'framer-motion'   // ← Added

function Hero() {
  return (
    <section className="hero" id="home">
      <motion.div
        className="hero-content container"
        initial={{ opacity: 0, y: 30 }}       // Start: invisible + down 30px
        animate={{ opacity: 1, y: 0 }}        // End: visible + back to position
        transition={{ duration: 0.8, ease: 'easeOut' }}  // Smooth fade
      >
        {/* GREETING */}
        <p className="hero-greeting">
          Hi there <span className="wave">👋</span>
        </p>

        {/* BIG NAME */}
        <h1 className="hero-title">
          I'm <span className="gradient-text">Iman Zahra</span>
        </h1>

        {/* ROLE */}
        <h2 className="hero-subtitle">
          Full Stack Developer
        </h2>

        {/* DESCRIPTION */}
        <p className="hero-description">
          I build clean, modern web applications using React, Node.js,
          and MySQL. Currently completing a Full Stack Development internship.
        </p>

        {/* BUTTONS */}
        <div className="hero-buttons">
          <motion.a
            href="#projects"
            className="btn btn-primary"
            whileHover={{ scale: 1.05, y: -3 }}   // ← Bouncy hover
            whileTap={{ scale: 0.98 }}            // ← Bouncy click
          >
            View My Work →
          </motion.a>
          <motion.a
            href="#contact"
            className="btn btn-secondary"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Me
          </motion.a>
        </div>

      
      </motion.div>
    </section>
  )
}

export default Hero