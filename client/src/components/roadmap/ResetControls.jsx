import React, { useState } from 'react';
import { FiRotateCcw, FiTrash2, FiAlertTriangle } from 'react-icons/fi';

const ResetControls = ({ onResetProgress, onResetEverything }) => {
  const [showConfirmProgress, setShowConfirmProgress] = useState(false);
  const [showConfirmEverything, setShowConfirmEverything] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-[var(--border)] mt-8">
      {/* Reset Progress Button */}
      <button
        type="button"
        onClick={() => setShowConfirmProgress(true)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--muted)] transition-all"
      >
        <FiRotateCcw className="w-3.5 h-3.5" />
        <span>Reset Progress</span>
      </button>

      {/* Reset Everything Button */}
      <button
        type="button"
        onClick={() => setShowConfirmEverything(true)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
      >
        <FiTrash2 className="w-3.5 h-3.5" />
        <span>Reset Everything</span>
      </button>

      {/* Reset Progress Modal */}
      {showConfirmProgress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-panel max-w-sm w-full p-6 rounded-2xl border border-[var(--border)] space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <FiAlertTriangle className="w-6 h-6" />
              <h4 className="font-syne font-bold text-base text-[var(--text)]">Reset Progress?</h4>
            </div>
            <p className="text-xs font-mono text-[var(--muted)]">
              This will uncheck all topics and subtopics for this roadmap. Your custom topics will be kept.
            </p>
            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setShowConfirmProgress(false)}
                className="px-4 py-2 text-xs font-mono text-[var(--muted)] hover:text-[var(--text)]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onResetProgress();
                  setShowConfirmProgress(false);
                }}
                className="px-4 py-2 text-xs font-mono font-bold bg-amber-500 text-black rounded-xl hover:brightness-110"
              >
                Reset Progress
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Everything Modal */}
      {showConfirmEverything && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-panel max-w-sm w-full p-6 rounded-2xl border border-[var(--border)] space-y-4">
            <div className="flex items-center gap-3 text-red-500">
              <FiAlertTriangle className="w-6 h-6" />
              <h4 className="font-syne font-bold text-base text-[var(--text)]">Reset Everything?</h4>
            </div>
            <p className="text-xs font-mono text-[var(--muted)]">
              This will uncheck all items, delete all custom topics you added, and clear your target date.
            </p>
            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setShowConfirmEverything(false)}
                className="px-4 py-2 text-xs font-mono text-[var(--muted)] hover:text-[var(--text)]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onResetEverything();
                  setShowConfirmEverything(false);
                }}
                className="px-4 py-2 text-xs font-mono font-bold bg-red-600 text-white rounded-xl hover:brightness-110"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetControls;
