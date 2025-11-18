import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Code2, BookOpen, Zap } from 'lucide-react';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [stars, setStars] = useState([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Generate stars
    const starArray = Array.from({ length: 80 }, () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.3,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 3,
    }));
    setStars(starArray);

    // Parallax scroll
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "Class Availability Tracker",
      shortDesc: "Real-time course enrollment monitoring",
      description: "Real-time university course monitoring system that scrapes enrollment data and provides instant notifications when seats become available.",
      tech: ["Python", "Playwright", "BeautifulSoup", "Real-time APIs"],
      highlights: [
        "25% faster parse rates with optimized HTML parsing",
        "Real-time notifications within 5 seconds of status changes",
        "50% improvement in database access efficiency",
        "State tracking to eliminate duplicate alerts",
        "Modular architecture for extensibility"
      ],
      github: "https://github.com/AlexJawhari",
      date: "September 2025"
    },
    {
      title: "Congress Stock Tracker",
      shortDesc: "Monitor congressional trading patterns",
      description: "Comprehensive platform analyzing congressional stock trades with real-time data aggregation and sophisticated pattern recognition.",
      tech: ["TBD", "Data Analysis", "APIs"],
      highlights: [
        "Real-time congressional trading data collection",
        "Advanced anomaly detection algorithms",
        "Custom alerts and trend notifications",
        "Historical analysis and forecasting"
      ],
      github: "#",
      date: "In Development"
    },
    {
      title: "Market Sentiment Analyzer",
      shortDesc: "NLP-powered market prediction tool",
      description: "Machine learning system that analyzes social media and financial news sentiment to predict market movements.",
      tech: ["NLP", "Python", "Machine Learning"],
      highlights: [
        "Multi-source sentiment analysis engine",
        "Real-time data processing pipeline",
        "Predictive modeling with ML algorithms",
        "Custom reporting and dashboards"
      ],
      github: "#",
      date: "Planned"
    }
  ];

  const resumeHighlights = [
    { metric: "3.36", label: "GPA" },
    { metric: "8+", label: "Languages" },
    { metric: "40%", label: "Improved Callbacks" },
    { metric: "Since Elementary", label: "Years Coding" }
  ];

  const skills = [
    { category: "Languages", items: ["Python", "C++", "Java", "JavaScript", "SQL"] },
    { category: "Backend", items: ["REST APIs", "Docker", "Linux", "Git", "Databases"] },
    { category: "Specialties", items: ["Web Scraping", "Automation", "Real-time Systems", "Data Processing"] }
  ];

  const philosophyQuotes = [
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "In the middle of complexity lies simplicity waiting to be discovered.", author: "Alan Perlis" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#1a1a3e] to-[#0f0f28] text-gray-100 font-sans overflow-x-hidden">
      {/* Animated Star Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: 0,
              animation: `twinkle ${star.duration}s infinite`,
              animationDelay: `${star.delay}s`,
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#16c784] rounded-full mix-blend-screen opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#0f3460] rounded-full mix-blend-screen opacity-5 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0a0e27]/80 border-b border-[#16c784]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-serif font-bold text-[#c9c9c9] tracking-[0.3em]">AJ</div>
          
          <div className="flex gap-1">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'projects', label: 'Projects' },
              { id: 'contact', label: 'Contact' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 font-medium transition-all duration-300 relative text-sm tracking-wider ${
                  activeTab === tab.id
                    ? 'text-[#16c784]'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#16c784] to-transparent" />
                )}
              </button>
            ))}
          </div>

          <a
            href="https://drive.google.com/file/d/1YOUR_RESUME_PDF_ID/view"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-[#16c784]/15 hover:bg-[#16c784]/25 text-[#16c784] border border-[#16c784]/50 rounded-lg transition-all duration-300 text-sm font-medium tracking-wide"
          >
            Resume
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10">
        {/* HOME TAB - RICH LANDING PAGE */}
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-24">
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-[#16c784] font-semibold tracking-widest text-sm">COMPUTER SCIENCE STUDENT</p>
                  <h1 className="text-7xl font-serif font-bold text-white leading-tight">
                    Alexander<br />Jawhari
                  </h1>
                  <div className="h-1 w-24 bg-gradient-to-r from-[#16c784] to-transparent"></div>
                </div>
                <p className="text-xl text-gray-300 max-w-2xl leading-relaxed font-light">
                  Backend systems architect crafting elegant solutions for complex problems. Specializing in real-time data processing, automation, and scalable architecture.
                </p>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="px-8 py-3 bg-[#16c784] text-[#0a0e27] font-semibold rounded-lg hover:bg-[#15b577] transition-all duration-300 flex items-center gap-2"
                  >
                    Explore Work <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="px-8 py-3 border border-[#16c784]/50 text-[#16c784] font-semibold rounded-lg hover:border-[#16c784] hover:bg-[#16c784]/10 transition-all duration-300"
                  >
                    Get In Touch
                  </button>
                </div>
              </div>
            </section>

            {/* Philosophy Quote */}
            <section className="max-w-7xl mx-auto px-6 py-16">
              <div className="border-l-2 border-[#16c784] pl-8 py-4 italic text-lg text-gray-300">
                "{philosophyQuotes[0].text}"
                <div className="mt-2 text-sm text-gray-500 not-italic">— {philosophyQuotes[0].author}</div>
              </div>
            </section>

            {/* Resume Highlights Grid */}
            <section className="max-w-7xl mx-auto px-6 py-16">
              <h2 className="text-3xl font-serif font-bold text-white mb-8">At a Glance</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {resumeHighlights.map((item, idx) => (
                  <div key={idx} className="bg-[#1a1a3e]/60 border border-[#16c784]/20 rounded-lg p-6 hover:border-[#16c784]/50 transition-all duration-300 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-[#16c784] mb-2">{item.metric}</div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider">{item.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Projects Preview */}
            <section className="max-w-7xl mx-auto px-6 py-16">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-serif font-bold text-white">Featured Projects</h2>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="text-[#16c784] hover:text-white transition-colors flex items-center gap-2"
                >
                  View All <ArrowRight size={18} />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.slice(0, 2).map((project, idx) => (
                  <div key={idx} className="group bg-[#1a1a3e]/50 border border-[#16c784]/20 rounded-lg p-6 hover:border-[#16c784]/60 hover:bg-[#1a1a3e]/80 transition-all duration-500 cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                        <p className="text-[#16c784] text-sm font-medium">{project.shortDesc}</p>
                      </div>
                      <Code2 size={24} className="text-[#16c784] opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((t, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-[#16c784]/10 text-[#16c784] rounded border border-[#16c784]/30">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills Preview */}
            <section className="max-w-7xl mx-auto px-6 py-16">
              <h2 className="text-3xl font-serif font-bold text-white mb-8">Technical Arsenal</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {skills.map((skillGroup, idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="text-[#16c784] font-semibold uppercase tracking-widest text-sm flex items-center gap-2">
                      <span className="h-1 w-8 bg-[#16c784]"></span>
                      {skillGroup.category}
                    </h3>
                    <div className="space-y-2">
                      {skillGroup.items.map((skill, i) => (
                        <div key={i} className="text-gray-300 text-sm hover:text-[#16c784] transition-colors cursor-default">
                          ▸ {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#16c784]/20">
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-serif font-bold text-white">Ready to Build Something?</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Let's discuss your next project or opportunity.</p>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="px-8 py-3 bg-[#16c784] text-[#0a0e27] font-semibold rounded-lg hover:bg-[#15b577] transition-all duration-300 inline-flex items-center gap-2"
                >
                  Contact Me <ArrowRight size={18} />
                </button>
              </div>
            </section>
          </>
        )}

        {/* ABOUT TAB */}
        {activeTab === 'about' && (
          <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="space-y-16">
              <div>
                <h1 className="text-5xl font-serif font-bold text-white mb-8">About Me</h1>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed max-w-3xl">
                  <p>
                    I'm a junior Computer Science student at UT Dallas, passionate about backend systems and real-time data architecture. My programming journey began in elementary school, driven by curiosity—it's now a disciplined craft of building elegant solutions.
                  </p>
                  <p>
                    My focus lies in crafting efficient, scalable systems. Whether optimizing data pipelines, automating complex workflows, or designing real-time monitoring infrastructure, I'm most engaged when solving architectural challenges.
                  </p>
                  <p>
                    Beyond code, I've developed leadership and communication skills through competitive debate and mentoring. These experiences shape how I approach collaboration and complex problem-solving.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-serif font-bold text-white mb-8">Experience</h2>
                <div className="bg-[#1a1a3e]/40 border border-[#16c784]/20 rounded-lg p-8 hover:border-[#16c784]/50 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Software Engineering Intern</h3>
                      <p className="text-[#16c784] font-semibold mt-1">Core Integrative Health</p>
                    </div>
                    <span className="text-gray-400 text-sm">2025</span>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Built comprehensive patient financial tracking database managing data for 50+ weekly patients",
                      "Engineered automated workflows for email/phone notifications improving callback rates by 40%",
                      "Implemented error-checking systems reducing data entry mistakes by 25%",
                      "Collaborated with finance and operations teams on data validation and integrity protocols"
                    ].map((point, idx) => (
                      <li key={idx} className="text-gray-300 flex gap-3">
                        <span className="text-[#16c784] font-bold flex-shrink-0">▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-serif font-bold text-white mb-8">Full Technical Stack</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {skills.map((group, idx) => (
                    <div key={idx} className="space-y-4">
                      <h3 className="text-[#16c784] font-bold uppercase tracking-wider text-sm">{group.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-[#1a1a3e] border border-[#16c784]/30 text-gray-300 text-sm rounded hover:border-[#16c784] transition-all">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <section className="max-w-7xl mx-auto px-6 py-20">
            <h1 className="text-5xl font-serif font-bold text-white mb-4">Projects</h1>
            <p className="text-gray-400 mb-12 max-w-2xl">A selection of projects showcasing expertise in backend systems, automation, and real-time data processing.</p>
            
            <div className="space-y-8">
              {projects.map((project, idx) => (
                <div key={idx} className="group bg-[#1a1a3e]/50 border border-[#16c784]/20 rounded-lg p-8 hover:border-[#16c784]/60 hover:bg-[#1a1a3e]/80 transition-all duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                      <p className="text-[#16c784] font-semibold">{project.shortDesc}</p>
                    </div>
                    <span className="text-gray-500 text-sm whitespace-nowrap ml-4">{project.date}</span>
                  </div>

                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">{project.description}</p>

                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-[#16c784] uppercase tracking-widest mb-3">Key Highlights</h3>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="text-gray-300 flex gap-3">
                          <span className="text-[#16c784] flex-shrink-0">▸</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-[#16c784]/10 text-[#16c784] text-xs rounded-full border border-[#16c784]/30">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#16c784] hover:text-white transition-colors font-semibold"
                    >
                      View Repository <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <section className="max-w-7xl mx-auto px-6 py-20">
            <h1 className="text-5xl font-serif font-bold text-white mb-4">Get In Touch</h1>
            <p className="text-gray-400 mb-12 max-w-2xl">Interested in discussing opportunities, projects, or ideas? Reach out through any of the following channels.</p>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl">
              <a
                href="mailto:alexjawhari00@gmail.com"
                className="group bg-[#1a1a3e]/60 border border-[#16c784]/20 rounded-lg p-8 hover:border-[#16c784]/60 hover:bg-[#1a1a3e]/80 transition-all duration-300 text-center"
              >
                <Mail size={32} className="text-[#16c784] mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <p className="text-gray-400 text-sm mb-2">Email</p>
                <p className="text-white font-semibold group-hover:text-[#16c784] transition-colors break-all">alexjawhari00@gmail.com</p>
              </a>

              <a
                href="https://github.com/AlexJawhari"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#1a1a3e]/60 border border-[#16c784]/20 rounded-lg p-8 hover:border-[#16c784]/60 hover:bg-[#1a1a3e]/80 transition-all duration-300 text-center"
              >
                <Github size={32} className="text-[#16c784] mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <p className="text-gray-400 text-sm mb-2">GitHub</p>
                <p className="text-white font-semibold group-hover:text-[#16c784] transition-colors">AlexJawhari</p>
              </a>

              <a
                href="https://linkedin.com/in/alexjawhari"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#1a1a3e]/60 border border-[#16c784]/20 rounded-lg p-8 hover:border-[#16c784]/60 hover:bg-[#1a1a3e]/80 transition-all duration-300 text-center"
              >
                <Linkedin size={32} className="text-[#16c784] mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <p className="text-gray-400 text-sm mb-2">LinkedIn</p>
                <p className="text-white font-semibold group-hover:text-[#16c784] transition-colors">alexjawhari</p>
              </a>
            </div>
          </section>
        )}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.8; }
        }

        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600&display=swap');

        .font-serif {
          font-family: 'Crimson Text', Georgia, serif;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
