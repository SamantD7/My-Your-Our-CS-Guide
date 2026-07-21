import React, { useState } from 'react';
import TopicCard from './TopicCard';
import { FiPlus } from 'react-icons/fi';

const PhaseSection = ({
  phase,
  roadmapId,
  checkedMap = {},
  onToggleSubtopic,
  onToggleTopic,
  onAddCustomTopic,
  onAddCustomSubtopic,
  onDeleteCustomTopic,
  onDeleteCustomSubtopic
}) => {
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicSubs, setNewTopicSubs] = useState('');

  const phaseId = (phase.phase || phase.title || 'phase').toLowerCase().replace(/[^a-z0-9]/g, '-');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;

    const subsArray = newTopicSubs
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    onAddCustomTopic(newTopicName.trim(), subsArray);
    setNewTopicName('');
    setNewTopicSubs('');
    setShowAddTopic(false);
  };

  return (
    <div id={phaseId} className="phase-section mb-10 scroll-mt-24">
      {/* Phase Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <span
            className="phase-badge text-xs font-mono font-bold tracking-widest px-2.5 py-1 rounded text-black uppercase"
            style={{ backgroundColor: phase.color || 'var(--accent)' }}
          >
            {phase.phase || phase.label || 'PHASE'}
          </span>
          <h2 className="text-lg sm:text-xl font-syne font-extrabold text-[var(--text)]">
            {phase.title || phase.name || ''}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setShowAddTopic(!showAddTopic)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--accent)]/30 text-[var(--accent)] bg-[var(--accent)]/10 text-xs font-mono font-semibold hover:bg-[var(--accent)]/20 transition-all"
        >
          <FiPlus className="w-3.5 h-3.5" />
          <span>Add Topic</span>
        </button>
      </div>

      {/* Add Custom Topic Form */}
      {showAddTopic && (
        <form
          onSubmit={handleAddSubmit}
          className="mb-4 p-4 rounded-xl glass-panel-subtle space-y-3 border border-[var(--accent)]/30"
        >
          <div className="text-xs font-mono font-bold text-[var(--accent)] uppercase">
            Create Custom Topic
          </div>
          <div>
            <label className="block text-xs font-mono text-[var(--muted)] mb-1">Topic Name</label>
            <input
              type="text"
              placeholder="e.g. Graph Neural Networks"
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
              className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-xs text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-[var(--muted)] mb-1">
              Subtopics (one per line)
            </label>
            <textarea
              placeholder="Subtopic 1 — description&#10;Subtopic 2 — description"
              value={newTopicSubs}
              onChange={(e) => setNewTopicSubs(e.target.value)}
              rows={3}
              className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-xs text-[var(--text)] focus:outline-none focus:border-[var(--accent)] font-mono"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowAddTopic(false)}
              className="px-3 py-1.5 text-xs text-[var(--muted)] hover:text-[var(--text)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold bg-[var(--accent)] text-black rounded-lg hover:brightness-110"
            >
              Save Topic
            </button>
          </div>
        </form>
      )}

      {/* Topic List */}
      <div className="space-y-2">
        {(phase.topics || []).map((topic, idx) => (
          <TopicCard
            key={topic.id || `topic_${idx}`}
            topic={topic}
            roadmapId={roadmapId}
            checkedMap={checkedMap}
            onToggleSubtopic={onToggleSubtopic}
            onToggleTopic={onToggleTopic}
            onAddSubtopic={onAddCustomSubtopic}
            onDeleteTopic={onDeleteCustomTopic}
            onDeleteSubtopic={onDeleteCustomSubtopic}
            topicIndex={idx + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default PhaseSection;
