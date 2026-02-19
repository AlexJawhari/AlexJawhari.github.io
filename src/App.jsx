import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import OrbitBackdrop from './components/OrbitBackdrop'
import Header from './components/Header'
import Footer from './components/Footer'

// Lazy load pages for code splitting
const Landing = lazy(() => import('./pages/Landing'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const ResumePage = lazy(() => import('./pages/ResumePage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

export default function App() {
  return (
    <div className="min-h-screen text-da-silver">
      <OrbitBackdrop />
      <Header />
      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-da-silver/60">Loading...</div></div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
