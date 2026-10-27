// Footer.jsx
// Simple footer — copyright + tech credit

import { motion } from 'framer-motion'   // ← Added

function Footer() {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="footer-container container">
        <p className="footer-text">
          © {year} <strong>Iman Zahra</strong>. All rights reserved.
        </p>
        <p className="footer-credit">
          Built with <span className="heart">❤️</span> using React
        </p>
      </div>
    </motion.footer>
  )
}

export default Footer