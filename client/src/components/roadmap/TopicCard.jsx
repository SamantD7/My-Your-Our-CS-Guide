import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronRight, FiPlus, FiTrash2, FiCheck, FiMinus } from 'react-icons/fi';
import SubtopicItem from './SubtopicItem';
import Badge from '../ui/Badge';

const TopicCard = ({
  topic,
  roadmapId,
  checkedMap = {},
  onToggleSubtopic,
  onToggleTopic,
  onAddSubtopic,
  onDeleteTopic,
  onDeleteSubtopic,
  topicIndex = 1
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newSubText, setNewSubText] = useState('');
  const [showAddSub, setShowAddSub] = useState(false);

  const subtopicKeys = (topic.subs || []).map((_, idx) => `${topic.id}_sub_${idx}`);
  const completedCount = subtopicKeys.filter((key) => checkedMap[key]).length;
  const totalCount = subtopicKeys.length;

  const isAllChecked = totalCount > 0 && completedCount === totalCount;
  const isPartiallyChecked = completedCount > 0 && completedCount < totalCount;

  const handleTopicCheckboxClick = (e) => {
    e.stopPropagation();
    onToggleTopic(topic.id, subtopicKeys, !isAllChecked);
  };

  const handleAddSubtopicSubmit = (e) => {
    e.preventDefault();
    if (!newSubText.trim()) return;
    onAddSubtopic(topic.id, newSubText.trim());
    setNewSubText('');
    setShowAddSub(false);
  };

  return (
    <div className="topic-card bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--muted)]/50 rounded-xl mb-3 overflow-hidden transition-all duration-200 shadow-sm">
      {/* Header Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-3.5 sm:p-4 cursor-pointer select-none hover:bg-[var(--surface2)]/40 transition-colors"
      >
        {/* Topic Index */}
        <span className="font-mono text-xs text-[var(--muted)] w-6 flex-shrink-0">
          {topicIndex < 10 ? `0${topicIndex}` : topicIndex}
        </span>

        {/* Checkbox */}
        <button
          type="button"
          onClick={handleTopicCheckboxClick}
          className={`w-4 h-4 sm:w-5 sm:h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
            isAllChecked
              ? 'bg-[var(--accent)] border-[var(--accent)] text-black'
              : isPartiallyChecked
              ? 'bg-[var(--accent)]/20 border-[var(--accent)] text-[var(--accent)]'
              : 'border-[var(--muted)] hover:border-[var(--accent)] bg-transparent'
          }`}
        >
          {isAllChecked && <FiCheck className="w-3.5 h-3.5 stroke-[3]" />}
          {isPartiallyChecked && <FiMinus className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Topic Title */}
        <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
          <span
            className={`font-syne font-bold text-sm sm:text-base ${
              isAllChecked ? 'line-through text-[var(--muted)]' : 'text-[var(--text)]'
            }`}
          >
            {topic.name || topic.t}
          </span>
          {topic.priority && <Badge type={topic.priority}>{topic.priority}</Badge>}
        </div>

        {/* Progress Counter */}
        {totalCount > 0 && (
          <span className="font-mono text-xs text-[var(--muted)] bg-[var(--surface2)] px-2 py-0.5 rounded border border-[var(--border)] whitespace-nowrap">
            {completedCount}/{totalCount}
          </span>
        )}

        {/* Add Subtopic Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowAddSub(!showAddSub);
            setIsOpen(true);
          }}
          className="p-1 rounded text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--surface2)] transition-colors"
          title="Add subtopic"
        >
          <FiPlus className="w-4 h-4" />
        </button>

        {/* Delete Topic (if custom) */}
        {topic.isCustom && onDeleteTopic && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteTopic(topic.id);
            }}
            className="p-1 rounded text-[var(--muted)] hover:text-[var(--danger)] hover:bg-red-500/10 transition-colors"
            title="Delete topic"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        )}

        {/* Expand Icon */}
        <FiChevronRight
          className={`w-4 h-4 text-[var(--muted)] transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </div>

      {/* Expandable Subtopics Section */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[var(--border)] bg-[var(--surface2)]/40 p-3 sm:p-4 space-y-1"
          >
            {/* Display Subtopics */}
            {(topic.subs || []).map((sub, idx) => {
              const itemKey = `${topic.id}_sub_${idx}`;
              return (
                <SubtopicItem
                  key={itemKey}
                  itemKey={itemKey}
                  text={sub}
                  isChecked={!!checkedMap[itemKey]}
                  onToggle={onToggleSubtopic}
                  isCustom={topic.isCustom}
                  onDelete={
                    topic.isCustom
                      ? () => onDeleteSubtopic && onDeleteSubtopic(topic.id, idx)
                      : undefined
                  }
                />
              );
            })}

            {/* Quick Add Subtopic Input Form */}
            {showAddSub && (
              <form onSubmit={handleAddSubtopicSubmit} className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Enter subtopic text..."
                  value={newSubText}
                  onChange={(e) => setNewSubText(e.target.value)}
                  className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-xs text-[var(--text)] focus:outline-none focus:border-[var(--accent)] font-mono"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[var(--accent)] text-black font-semibold rounded-lg text-xs hover:brightness-110"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddSub(false)}
                  className="px-3 py-1.5 border border-[var(--border)] text-[var(--muted)] rounded-lg text-xs hover:text-[var(--text)]"
                >
                  Cancel
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopicCard;
