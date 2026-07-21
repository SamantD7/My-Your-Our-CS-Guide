import React, { useEffect, useState } from 'react';
import { FiChevronRight, FiList } from 'react-icons/fi';

const Sidebar = ({ sections = [], activeId = '', roadmapId = '', overallProgress = 0 }) => {
  const [activeSection, setActiveSection] = useState(activeId || (sections[0]?.id || ''));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto pr-4 space-y-4">
      {/* Brand / Guide Block */}
      <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)] mb-1">
          <FiList />
          <span>Roadmap Navigation</span>
        </div>
        <div className="flex justify-between items-center text-xs font-mono text-[var(--muted)] mt-2">
          <span>Completion</span>
          <span className="font-bold text-[var(--accent)]">{Math.round(overallProgress)}%</span>
        </div>
        <div className="w-full bg-[var(--border)] h-1.5 rounded-full overflow-hidden mt-1">
          <div
            className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] h-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-1">
        <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] px-3 py-1 font-semibold">
          Phases & Topics
        </div>
        {sections.map((sec, idx) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id || idx}
              onClick={() => scrollTo(sec.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all text-left font-medium ${
                isActive
                  ? 'bg-[var(--surface2)] text-[var(--accent)] font-bold border border-[var(--accent)]/30 shadow-sm'
                  : 'text-[var(--text)] hover:bg-[var(--surface2)] hover:text-[var(--text)]'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                {sec.badge && (
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: sec.badgeColor || 'var(--accent)' }}
                  />
                )}
                <span className="truncate">{sec.title || sec.name}</span>
              </div>
              <FiChevronRight
                className={`w-3.5 h-3.5 transition-transform flex-shrink-0 ${
                  isActive ? 'translate-x-0.5 text-[var(--accent)]' : 'opacity-40'
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
