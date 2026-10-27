// App.jsx
// Root component — imports and renders all sections

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './components/Navbar.css'
import './components/Hero.css'
import './components/About.css'
import './components/Skills.css'
import './components/Projects.css'
import './components/Contact.css'
import './components/Footer.css'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App