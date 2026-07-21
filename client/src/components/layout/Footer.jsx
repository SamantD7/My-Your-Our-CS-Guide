import React from 'react';
import { FiGithub } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] p-0.5">
            <div className="w-full h-full bg-[var(--surface)] rounded-[6px] flex items-center justify-center font-syne font-extrabold text-xs text-[var(--accent)]">
              CS
            </div>
          </div>
          <span className="font-syne font-bold text-sm text-[var(--text)]">
            My/Your/Our CS Guide
          </span>
        </div>

        <div className="text-xs font-mono text-[var(--muted)] text-center">
          "My learning. Your preparation. Our community."
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-[var(--accent)] bg-[var(--surface2)] px-3 py-1 rounded-full border border-[var(--border)]">
            More coming soon...
          </span>
          <a
            href="https://github.com/SamantD7"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[var(--surface2)] text-[var(--text)] hover:text-[var(--accent)] border border-[var(--border)] hover:border-[var(--accent)] transition-all"
            aria-label="GitHub Profile"
          >
            <FiGithub className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
