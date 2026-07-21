import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const RoadmapLayout = ({ children, sections = [], roadmapId = '', overallProgress = 0 }) => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[var(--text)] font-sans transition-colors duration-300">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {sections.length > 0 && (
            <Sidebar sections={sections} roadmapId={roadmapId} overallProgress={overallProgress} />
          )}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoadmapLayout;
