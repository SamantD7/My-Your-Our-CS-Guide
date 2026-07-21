import React from 'react';
import { motion } from 'framer-motion';
import ProgressBar from '../ui/ProgressBar';

const ProgressPanel = ({
  totalTopics = 0,
  completedTopics = 0,
  totalSubtopics = 0,
  completedSubtopics = 0
}) => {
  const topicPct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  const subtopicPct = totalSubtopics > 0 ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0;

  const remainingTopics = totalTopics - completedTopics;
  const remainingSubtopics = totalSubtopics - completedSubtopics;

  return (
    <div className="glass-panel rounded-2xl p-6 mb-8 border border-[var(--border)] shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-syne font-extrabold text-[var(--text)]">
            Track Your Progress
          </h3>
          <p className="text-xs font-mono text-[var(--muted)]">Real-time completion analytics</p>
        </div>
        <div className="text-right">
          <span className="text-3xl sm:text-4xl font-syne font-black gradient-text">
            {subtopicPct}%
          </span>
        </div>
      </div>

      <ProgressBar progress={subtopicPct} height="h-3" className="mb-6" />

      {/* Grid Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)]">
          <div className="text-xl font-syne font-bold text-[var(--accent)]">
            {completedTopics} / {totalTopics}
          </div>
          <div className="text-[11px] font-mono text-[var(--muted)]">Completed Topics</div>
        </div>

        <div className="p-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)]">
          <div className="text-xl font-syne font-bold text-[var(--warn)]">
            {remainingTopics}
          </div>
          <div className="text-[11px] font-mono text-[var(--muted)]">Remaining Topics</div>
        </div>

        <div className="p-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)]">
          <div className="text-xl font-syne font-bold text-[var(--accent2)]">
            {completedSubtopics} / {totalSubtopics}
          </div>
          <div className="text-[11px] font-mono text-[var(--muted)]">Completed Subtopics</div>
        </div>

        <div className="p-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)]">
          <div className="text-xl font-syne font-bold text-[var(--danger)]">
            {remainingSubtopics}
          </div>
          <div className="text-[11px] font-mono text-[var(--muted)]">Remaining Subtopics</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPanel;
