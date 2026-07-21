import React from 'react';

const Badge = ({ type = 'must', children, className = '' }) => {
  let badgeStyle = '';

  switch (type) {
    case 'must':
      badgeStyle = 'bg-[var(--must-bg)] text-[var(--must)] border-[var(--must-line)]';
      break;
    case 'important':
    case 'imp':
      badgeStyle = 'bg-[var(--imp-bg)] text-[var(--imp)] border-[var(--imp-line)]';
      break;
    case 'good':
      badgeStyle = 'bg-[var(--good-bg)] text-[var(--good)] border-[var(--good-line)]';
      break;
    default:
      badgeStyle = 'bg-[var(--surface2)] text-[var(--muted)] border-[var(--border)]';
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border uppercase tracking-wider ${badgeStyle} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {children || type}
    </span>
  );
};

export default Badge;
