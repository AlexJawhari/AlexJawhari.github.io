import React from 'react'
import { Routes, Route } from 'react-router-dom'
import OrbitBackdrop from './components/OrbitBackdrop'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetail from './pages/ProjectDetail'
import ResumePage from './pages/ResumePage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <div className="min-h-screen text-da-silver">
      <OrbitBackdrop />
      <Header />
      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
