// import { useState, useEffect } from 'react';

// function Navbar() {
//   // State to track if dark mode is on
//   const [isDark, setIsDark] = useState(false);

//   // When the toggle changes, add/remove the 'dark-theme' class on the <body>
//   useEffect(() => {
//     if (isDark) {
//       document.body.classList.add('dark-theme');
//     } else {
//       document.body.classList.remove('dark-theme');
//     }
//   }, [isDark]);

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
        
//         <a href="#home" className="navbar-logo">
//           Iman Zahra<span className="dot">.</span>
//         </a>

//         {/* Your exact list structure preserved */}
//         <ul className="navbar-links">
//           <li><a href="#about">About</a></li>
//           <li><a href="#skills">Skills</a></li>
//           <li><a href="#projects">Projects</a></li>
//           <li><a href="#contact">Contact</a></li>
          
//           {/* THE THEME TOGGLE BUTTON */}
//           <li>
//             <button 
//               onClick={() => setIsDark(!isDark)} 
//               className="theme-toggle-btn"
//             >
//               {isDark ? '☀️ Light' : '🌙 Dark'}
//             </button>
//           </li>
//         </ul>

//       </div>
//     </nav>
//   )
// }

// export default Navbar;

import { useState, useEffect } from 'react';

function Navbar() {
  // ===== DARK MODE STATE =====
  const [isDark, setIsDark] = useState(false);

  // ===== NEW: MOBILE MENU STATE =====
  // false = menu closed, true = menu open
  const [menuOpen, setMenuOpen] = useState(false);

  // ===== DARK MODE EFFECT (unchanged) =====
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDark]);

  // ===== NEW: CLOSE MENU WHEN LINK CLICKED =====
  // When user taps a link on mobile, menu should close
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* ===== LOGO (unchanged) ===== */}
        <a href="#home" className="navbar-logo">
          Iman Zahra<span className="dot">.</span>
        </a>

        {/* ===== NEW: HAMBURGER BUTTON (only shows on mobile via CSS) ===== */}
        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* ===== NAV LINKS (added dynamic class + onClick handlers) ===== */}
        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="#about" onClick={handleLinkClick}>About</a></li>
          <li><a href="#skills" onClick={handleLinkClick}>Skills</a></li>
          <li><a href="#projects" onClick={handleLinkClick}>Projects</a></li>
          <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>

          {/* THEME TOGGLE BUTTON (unchanged) */}
          <li>
            <button
              onClick={() => setIsDark(!isDark)}
              className="theme-toggle-btn"
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;