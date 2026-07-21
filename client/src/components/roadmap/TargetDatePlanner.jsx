import React from 'react';
import { FiCalendar, FiX, FiClock, FiTarget } from 'react-icons/fi';

const TargetDatePlanner = ({
  targetDate = '',
  onSetTargetDate,
  remainingTopics = 0,
  remainingSubtopics = 0
}) => {
  const handleDateChange = (e) => {
    onSetTargetDate(e.target.value);
  };

  const handleClearDate = () => {
    onSetTargetDate('');
  };

  // Calculations
  let daysRemaining = 0;
  let weeksRemaining = 0;

  if (targetDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    weeksRemaining = Math.max(0.1, daysRemaining / 7);
  }

  const topicsPerDay = targetDate && daysRemaining > 0 ? (remainingTopics / daysRemaining).toFixed(1) : 0;
  const subtopicsPerDay = targetDate && daysRemaining > 0 ? (remainingSubtopics / daysRemaining).toFixed(1) : 0;
  const topicsPerWeek = targetDate && weeksRemaining > 0 ? (remainingTopics / weeksRemaining).toFixed(1) : 0;
  const subtopicsPerWeek = targetDate && weeksRemaining > 0 ? (remainingSubtopics / weeksRemaining).toFixed(1) : 0;

  let urgencyClass = 'text-[var(--accent)]';
  if (daysRemaining < 14) urgencyClass = 'text-[var(--danger)]';
  else if (daysRemaining < 30) urgencyClass = 'text-[var(--warn)]';

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 mb-8 border border-[var(--border)] transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[var(--surface2)] text-[var(--accent)] border border-[var(--border)]">
            <FiTarget className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-syne font-extrabold text-[var(--text)]">
              Target Date Planner
            </h3>
            <p className="text-xs font-mono text-[var(--muted)]">Calculate required daily & weekly velocity</p>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="date"
              value={targetDate}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
              className="bg-[var(--surface2)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs font-mono text-[var(--text)] focus:outline-none focus:border-[var(--accent)] cursor-pointer"
            />
          </div>
          {targetDate && (
            <button
              onClick={handleClearDate}
              className="p-2 text-[var(--muted)] hover:text-[var(--danger)] transition-colors"
              title="Clear Target Date"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Analytics Breakdown */}
      {targetDate ? (
        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[var(--muted)]">Deadline Countdown</span>
            <span className={`font-syne font-extrabold text-xl ${urgencyClass}`}>
              {daysRemaining} {daysRemaining === 1 ? 'Day' : 'Days'} Remaining
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)]">
              <div className="text-xs font-mono text-[var(--muted)]">Topics / Day</div>
              <div className="text-lg font-syne font-bold text-[var(--accent)] mt-0.5">
                {topicsPerDay}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)]">
              <div className="text-xs font-mono text-[var(--muted)]">Subtopics / Day</div>
              <div className="text-lg font-syne font-bold text-[var(--accent2)] mt-0.5">
                {subtopicsPerDay}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)]">
              <div className="text-xs font-mono text-[var(--muted)]">Topics / Week</div>
              <div className="text-lg font-syne font-bold text-[var(--warn)] mt-0.5">
                {topicsPerWeek}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)]">
              <div className="text-xs font-mono text-[var(--muted)]">Subtopics / Week</div>
              <div className="text-lg font-syne font-bold text-teal-400 mt-0.5">
                {subtopicsPerWeek}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 text-center py-3 text-xs font-mono text-[var(--muted)] bg-[var(--surface2)]/50 rounded-xl border border-dashed border-[var(--border)]">
          Select a target date above to calculate daily and weekly pacing goals.
        </div>
      )}
    </div>
  );
};

export default TargetDatePlanner;
