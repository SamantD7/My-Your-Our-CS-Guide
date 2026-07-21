import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress = 0, height = 'h-2', showLabel = false, className = '' }) => {
  const clampedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-mono text-[var(--muted)] mb-1">
          <span>Overall Progress</span>
          <span className="font-bold text-[var(--accent)]">{clampedProgress}%</span>
        </div>
      )}
      <div className={`w-full bg-[var(--border)] rounded-full overflow-hidden ${height}`}>
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
