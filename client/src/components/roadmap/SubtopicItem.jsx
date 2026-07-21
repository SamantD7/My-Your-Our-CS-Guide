import React from 'react';
import { FiCheck, FiTrash2 } from 'react-icons/fi';

const SubtopicItem = ({
  itemKey,
  text,
  isChecked = false,
  onToggle,
  isCustom = false,
  onDelete
}) => {
  // Split text by " — " if available to format title & detail like sample1
  const parts = text.split(' — ');
  const hasDash = parts.length > 1;

  return (
    <div className="group flex items-start gap-3 py-2 px-3 sm:px-4 rounded-lg hover:bg-[var(--surface2)]/60 transition-colors">
      <button
        type="button"
        onClick={() => onToggle(itemKey)}
        className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center flex-shrink-0 transition-all ${
          isChecked
            ? 'bg-[var(--accent)] border-[var(--accent)] text-black'
            : 'border-[var(--muted)] hover:border-[var(--accent)] bg-transparent'
        }`}
        aria-label="Toggle subtopic"
      >
        {isChecked && <FiCheck className="w-3 h-3 stroke-[3]" />}
      </button>

      <div
        onClick={() => onToggle(itemKey)}
        className="flex-1 cursor-pointer text-xs sm:text-sm leading-relaxed select-none"
      >
        {hasDash ? (
          <span className={isChecked ? 'line-through text-[var(--muted)]' : 'text-[var(--text)]'}>
            <strong className={isChecked ? 'text-[var(--muted)] font-bold' : 'text-[var(--accent)] font-bold'}>
              {parts[0]}
            </strong>
            <span className="text-[var(--muted)] font-mono mx-1">—</span>
            <span>{parts.slice(1).join(' — ')}</span>
          </span>
        ) : (
          <span className={isChecked ? 'line-through text-[var(--muted)]' : 'text-[var(--text)]'}>
            {text}
          </span>
        )}
      </div>

      {isCustom && onDelete && (
        <button
          type="button"
          onClick={() => onDelete(itemKey)}
          className="opacity-0 group-hover:opacity-100 p-1 text-[var(--muted)] hover:text-[var(--danger)] transition-all"
          title="Delete subtopic"
        >
          <FiTrash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default SubtopicItem;
