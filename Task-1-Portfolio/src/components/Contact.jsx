// Contact.jsx
// Contact section — fades in on scroll

import { motion } from 'framer-motion'   // ← Added

function Contact() {
  const contacts = [
    {
      icon: '📧',
      label: 'Email',
      value: 'imanzahra2005@gmail.com',
      href: 'mailto:imanzahra2005@gmail.com',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'iman-zahra',
      href: 'https://www.linkedin.com/in/iman-zahra-28793a358',
    },
    {
      icon: '💻',
      label: 'GitHub',
      value: 'imanzahra-26',
      href: 'https://github.com/imanzahra-26',
    },
    {
      icon: '📱',
      label: 'WhatsApp',
      value: '+92 305 9333959',
      href: 'https://wa.me/923059333959',
    },
  ]

  return (
    <motion.section
      className="contact"
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="contact-container container">

        <div className="section-header">
          <p className="section-tag">Get in Touch</p>
          <h2 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
        </div>

        <div className="contact-grid">
          <div className="contact-text">
            <h3>Have a project in mind?</h3>
            <p>
              I'm always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision. Feel free to reach
              out through any of these channels — I'll get back to you as
              soon as possible.
            </p>
            <p className="contact-highlight">
              Currently available for <strong>internships</strong> and{' '}
              <strong>freelance work</strong>.
            </p>
          </div>

          <div className="contact-links">
            {contacts.map((c, i) => (
              <motion.a
                key={i}
                href={c.href}
                className="contact-card"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <span className="contact-icon">{c.icon}</span>
                <div>
                  <span className="contact-label">{c.label}</span>
                  <span className="contact-value">{c.value}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact