import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiLayers, FiBookOpen, FiArrowRight, FiCheckCircle, FiStar, FiMessageSquare } from 'react-icons/fi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import GlassCard from '../components/ui/GlassCard';
import { useAuthStore } from '../store/authStore';

const Home = () => {
  const { isAuthenticated, user } = useAuthStore();

  const cards = [
    {
      id: 'dsa',
      title: 'DSA Guide',
      subtitle: 'Roadmap Checklist & Subtopic Identifier',
      desc: 'Master foundations, data structures, dynamic programming, graphs, and advanced algorithms with exact LeetCode problem mappings.',
      icon: FiCode,
      color: 'from-pink-500 to-rose-600',
      path: '/dsa'
    },
    {
      id: 'aptitude',
      title: 'Aptitude Guide',
      subtitle: 'Quantitative, Logical & Verbal',
      desc: 'Complete placement aptitude prep featuring step-by-step formulas, syllabus details, question types, and shortcut tricks.',
      icon: FiBookOpen,
      color: 'from-purple-500 to-indigo-600',
      path: '/aptitude'
    },
    {
      id: 'webdev',
      title: 'Web Development Concepts',
      subtitle: 'Browser, Networking & Backend Architecture',
      desc: 'Deep dive into how the web works, DOM rendering, HTTP/HTTPS, security, caching, databases, and system design internals.',
      icon: FiLayers,
      color: 'from-cyan-500 to-blue-600',
      path: '/webdev'
    },
    {
      id: 'ai-engineer',
      title: 'Full Stack AI Engineer',
      subtitle: 'GenAI + RAG Specialization',
      desc: 'Roadmap to modern AI engineering: LLM prompt engineering, embeddings, ChromaDB, vector search, RAG pipelines, and AI agents.',
      icon: FiCpu,
      color: 'from-emerald-400 to-teal-600',
      path: '/ai-engineer'
    }
  ];

  const youtuberReviews = [
    {
      id: 'striver',
      name: 'Striver',
      role: 'Founder, takeUforward • A2Z DSA Sheet Creator',
      avatar: 'S',
      color: 'from-rose-500 to-red-600',
      rating: 5,
      quote: `Absolutely beautiful website. The interface is clean, the content is practical, and everything a CSE student actually needs is in one place. I genuinely didn't expect it to be this comprehensive. It's almost equivalent to my A2Z DSA Sheet... almost.\n\nIf students keep using this, they might stop asking me for roadmaps every other day.\n\nCollab?`
    },
    {
      id: 'love-babbar',
      name: 'Love Babbar',
      role: 'Founder, CodeHelp • ex-Amazon SDE',
      avatar: 'LB',
      color: 'from-amber-500 to-orange-600',
      rating: 5,
      quote: `This is the kind of website every Computer Science student should bookmark from day one. It brings together notes, roadmaps, interview preparation, DSA resources, and much more in a very structured way. The effort behind this is clearly visible.\n\n📚 9.9/10 Study Material\n🤩 9.9/10 Website Interface\n❤️ 9.9/10 User Experience\n😊 10/10 This Review Section`
    },
    {
      id: 'codewithharry',
      name: 'CodeWithHarry',
      role: 'Founder, CodeWithHarry • 5M+ Subscribers',
      avatar: 'H',
      color: 'from-indigo-500 to-purple-600',
      rating: 5,
      quote: `I have a complaint.\n\nThis website somehow stole all the future roadmaps I was planning to upload on my YouTube channel. 🤨\n\nSeriously... do you have access to my notebook or what?`
    },
    {
      id: 'harkirat-singh',
      name: 'Harkirat Singh',
      role: 'Founder, 100xDevs • Full Stack & AI Cohort Lead',
      avatar: 'HS',
      color: 'from-emerald-400 to-teal-600',
      rating: 5,
      quote: `Today I'm going to cover this website.\n\nOne of the biggest mistakes self-taught developers make is trying to learn from twenty different places at once. They end up with twenty browser tabs and zero consistency.\n\nA website like this solves that problem by bringing everything together in one place—from DSA and development to interview preparation and career guidance.\n\nHonestly... after seeing this, I'm considering renaming my batch to Super 31.`
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[var(--text)] transition-colors duration-300">
      <Navbar />

      {/* Hero Section with Animated Mesh & Blobs */}
      <section className="relative overflow-hidden pt-20 pb-28 animated-mesh-bg">
        {/* Decorative Floating Blobs */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-[var(--accent)]/10 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[var(--accent2)]/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Logo Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[var(--border)] mb-8 shadow-xl"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] p-0.5">
              <div className="w-full h-full bg-[var(--surface)] rounded-[4px] flex items-center justify-center font-syne font-extrabold text-[10px] text-[var(--accent)]">
                CS
              </div>
            </div>
            <span className="font-mono text-xs font-semibold tracking-wide text-[var(--text)]">
              MY / YOUR / OUR CS GUIDE
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-syne font-black tracking-tight leading-none mb-6"
          >
            Computer Science <br />
            <span className="gradient-text">Engineered for Success.</span>
          </motion.h1>

          {/* Subtitle with My / Your / Our meaning */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-[var(--muted)] max-w-3xl mx-auto space-y-2 mb-10 leading-relaxed font-sans"
          >
            <p className="font-syne font-bold text-[var(--text)]">
              "My learning. Your preparation. Our community."
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono pt-4 text-left">
              <div className="p-3 rounded-xl glass-panel-subtle border border-[var(--border)]">
                <span className="font-bold text-[var(--accent)] block text-sm mb-1">My</span>
                My personal learning journey.
              </div>
              <div className="p-3 rounded-xl glass-panel-subtle border border-[var(--border)]">
                <span className="font-bold text-[var(--accent2)] block text-sm mb-1">Your</span>
                Your placement preparation.
              </div>
              <div className="p-3 rounded-xl glass-panel-subtle border border-[var(--border)]">
                <span className="font-bold text-teal-400 block text-sm mb-1">Our</span>
                A shared community of Computer Science students.
              </div>
            </div>
          </motion.div>

          {/* Quick CTA Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#roadmaps"
              className="px-6 py-3.5 rounded-xl font-syne font-bold text-sm bg-[var(--accent)] text-black hover:brightness-110 shadow-lg shadow-[var(--accent)]/20 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Roadmaps</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            {!isAuthenticated && (
              <Link
                to="/signup"
                className="px-6 py-3.5 rounded-xl font-syne font-bold text-sm glass-panel border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] transition-all"
              >
                Create Account
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 border-y border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-syne font-bold mb-3">
              Why Engineers Choose This Platform
            </h2>
            <p className="text-sm font-mono text-[var(--muted)]">
              Built as a modern SaaS tool for disciplined preparation, eliminating clutter and keeping you focused.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl glass-panel-subtle border border-[var(--border)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-bold text-lg">
                <FiCheckCircle />
              </div>
              <h3 className="font-syne font-bold text-base">Uncompromised Content</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Uses exact, comprehensive study materials with precise headings, topics, and problem identifiers.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel-subtle border border-[var(--border)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent2)]/10 text-[var(--accent2)] flex items-center justify-center font-bold text-lg">
                <FiLayers />
              </div>
              <h3 className="font-syne font-bold text-base">Real-time Velocity Analytics</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Set target placement dates to instantly calculate how many topics and subtopics you must complete daily and weekly.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel-subtle border border-[var(--border)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-lg">
                <FiCpu />
              </div>
              <h3 className="font-syne font-bold text-base">Hybrid Cloud Sync</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Seamless local storage when offline, automatically syncing with your cloud database once logged in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Cards Section */}
      <section id="roadmaps" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-syne font-extrabold mb-4">
            Curated Study Guides
          </h2>
          <p className="text-sm font-mono text-[var(--muted)]">
            Select a guide to view full checklists, interview questions, and target planners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <GlassCard
                key={card.id}
                className="group relative overflow-hidden border border-[var(--border)] hover:border-[var(--accent)]/40 p-8"
              >
                {/* Header with icon */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} p-0.5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="w-full h-full bg-[var(--surface)] rounded-[14px] flex items-center justify-center text-[var(--text)]">
                      <IconComponent className="w-7 h-7" />
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-syne font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs font-mono text-[var(--accent)] mb-4">{card.subtitle}</p>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">{card.desc}</p>

                <Link
                  to={card.path}
                  className="inline-flex items-center gap-2 font-syne font-bold text-xs text-[var(--text)] group-hover:text-[var(--accent)] transition-colors"
                >
                  <span>Open Roadmap</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 100% Real YouTuber Reviews Section */}
      <section className="py-20 border-t border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur-md relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-xs font-mono text-[var(--accent)] mb-4 border border-[var(--border)]">
              <FiMessageSquare className="w-3.5 h-3.5" />
              <span>Fun Community Wall</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-syne font-extrabold mb-3 text-[var(--text)]">
              100% Real Reviews from Our Long-Time Users content - 😊
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[var(--muted)]">
              (Definitely 100% legit feedback from top educators & creators... 😉)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {youtuberReviews.map((rev) => (
              <GlassCard
                key={rev.id}
                className="p-8 border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all flex flex-col justify-between relative overflow-hidden"
              >
                <div className="relative z-10">
                  {/* Header with Avatar & Name */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${rev.color} p-0.5 shadow-md shrink-0`}>
                      <div className="w-full h-full bg-[var(--surface)] rounded-[14px] flex items-center justify-center font-syne font-extrabold text-sm gradient-text">
                        {rev.avatar}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-syne font-bold text-lg text-[var(--text)] truncate">
                        {rev.name}
                      </h3>
                      <p className="text-xs font-mono text-[var(--muted)] truncate">
                        {rev.role}
                      </p>
                    </div>
                  </div>

                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote Content */}
                  <div className="text-xs sm:text-sm text-[var(--text)]/90 leading-relaxed font-sans whitespace-pre-line">
                    {rev.quote}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Bottom Corner Note */}
        <div className="absolute bottom-4 right-6 text-xs font-mono text-[var(--muted)] opacity-70 hover:opacity-100 transition-opacity italic select-none">
          Sorry... 🙏
        </div>
      </section>

      {/* Authentication CTA Section */}
      {!isAuthenticated && (
        <section className="py-16 border-t border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-syne font-bold mb-4">
              Sync Your Progress Across Devices
            </h2>
            <p className="text-sm font-mono text-[var(--muted)] mb-8 max-w-xl mx-auto">
              Sign up for a free account to save your checked topics, custom additions, and target dates in the cloud.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/signup"
                className="px-6 py-3 rounded-xl font-syne font-bold text-sm bg-[var(--accent)] text-black hover:brightness-110 shadow-lg"
              >
                Sign Up Now
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-xl font-syne font-bold text-sm glass-panel border border-[var(--border)] text-[var(--text)]"
              >
                Log In
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Home;
