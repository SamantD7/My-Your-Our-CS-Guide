import React, { useEffect, useState } from 'react';
import RoadmapLayout from '../components/layout/RoadmapLayout';
import PhaseSection from '../components/roadmap/PhaseSection';
import ProgressPanel from '../components/roadmap/ProgressPanel';
import TargetDatePlanner from '../components/roadmap/TargetDatePlanner';
import ResetControls from '../components/roadmap/ResetControls';
import Badge from '../components/ui/Badge';

import { DEFAULT_DATA } from '../data/dsaData';
import { GUIDE_DATA } from '../data/dsaGuideData';
import { useProgressStore } from '../store/progressStore';
import { useAuthStore } from '../store/authStore';

const DSAGuide = () => {
  const [activeTab, setActiveTab] = useState('checklist'); // 'checklist' | 'identifier'
  const roadmapId = 'dsa';

  const { isAuthenticated } = useAuthStore();
  const {
    progressMap,
    targetMap,
    customTopicsMap,
    loadRoadmapState,
    toggleCheck,
    setMultipleChecks,
    setTargetDate,
    addCustomTopic,
    addCustomSubtopic,
    deleteCustomTopic,
    deleteCustomSubtopic,
    resetProgress,
    resetEverything
  } = useProgressStore();

  useEffect(() => {
    loadRoadmapState(roadmapId, isAuthenticated);
  }, [roadmapId, isAuthenticated, loadRoadmapState]);

  const checkedMap = progressMap[roadmapId] || {};
  const targetDate = targetMap[roadmapId] || '';
  const customTopics = customTopicsMap[roadmapId] || [];

  // Combine default phases with custom topics phase if present
  const allPhases = [...DEFAULT_DATA];
  if (customTopics.length > 0) {
    allPhases.push({
      phase: 'PHASE CUSTOM',
      title: 'Custom Topics',
      color: '#7b61ff',
      topics: customTopics
    });
  }

  // Calculate statistics
  let totalTopicsCount = 0;
  let completedTopicsCount = 0;
  let totalSubtopicsCount = 0;
  let completedSubtopicsCount = 0;

  allPhases.forEach((phase) => {
    (phase.topics || []).forEach((topic) => {
      totalTopicsCount += 1;
      const subKeys = (topic.subs || []).map((_, idx) => `${topic.id}_sub_${idx}`);
      const checkedSubs = subKeys.filter((k) => checkedMap[k]);

      totalSubtopicsCount += subKeys.length;
      completedSubtopicsCount += checkedSubs.length;

      if (subKeys.length > 0 && checkedSubs.length === subKeys.length) {
        completedTopicsCount += 1;
      }
    });
  });

  const overallPct = totalSubtopicsCount > 0 ? (completedSubtopicsCount / totalSubtopicsCount) * 100 : 0;

  // Sidebar navigation sections format
  const sidebarSections = allPhases.map((phase) => ({
    id: (phase.phase || phase.title || '').toLowerCase().replace(/[^a-z0-9]/g, '-'),
    title: phase.title || phase.phase,
    badge: true,
    badgeColor: phase.color
  }));

  // Topic handlers
  const handleToggleSubtopic = (itemKey) => {
    toggleCheck(roadmapId, itemKey, isAuthenticated);
  };

  const handleToggleTopic = (topicId, subKeys, targetState) => {
    const updates = {};
    subKeys.forEach((key) => {
      updates[key] = targetState;
    });
    setMultipleChecks(roadmapId, updates, isAuthenticated);
  };

  const handleAddCustomTopic = (name, subs) => {
    addCustomTopic(roadmapId, name, subs, isAuthenticated);
  };

  const handleAddCustomSubtopic = (topicId, text) => {
    addCustomSubtopic(roadmapId, topicId, text, isAuthenticated);
  };

  const handleDeleteCustomTopic = (topicId) => {
    deleteCustomTopic(roadmapId, topicId, isAuthenticated);
  };

  return (
    <RoadmapLayout sections={activeTab === 'checklist' ? sidebarSections : []} roadmapId={roadmapId} overallProgress={overallPct}>
      <div className="space-y-6">
        {/* Title Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-syne font-extrabold gradient-text mb-2">
            Data Structures & Algorithms Guide
          </h1>
          <p className="text-xs sm:text-sm font-mono text-[var(--muted)]">
            Complete DSA roadmap checklist & subtopic pattern identifier from data1.txt
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex bg-[var(--surface2)] border border-[var(--border)] p-1 rounded-xl max-w-md">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex-1 py-2 rounded-lg text-xs font-syne font-bold transition-all ${
              activeTab === 'checklist'
                ? 'bg-[var(--surface)] text-[var(--text)] shadow-sm'
                : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            Roadmap Checklist
          </button>
          <button
            onClick={() => setActiveTab('identifier')}
            className={`flex-1 py-2 rounded-lg text-xs font-syne font-bold transition-all ${
              activeTab === 'identifier'
                ? 'bg-[var(--surface)] text-[var(--text)] shadow-sm'
                : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            Subtopic Identifier Guide
          </button>
        </div>

        {activeTab === 'checklist' ? (
          <>
            {/* Progress Analytics Panel */}
            <ProgressPanel
              totalTopics={totalTopicsCount}
              completedTopics={completedTopicsCount}
              totalSubtopics={totalSubtopicsCount}
              completedSubtopics={completedSubtopicsCount}
            />

            {/* Target Date Planner */}
            <TargetDatePlanner
              targetDate={targetDate}
              onSetTargetDate={(date) => setTargetDate(roadmapId, date, isAuthenticated)}
              remainingTopics={totalTopicsCount - completedTopicsCount}
              remainingSubtopics={totalSubtopicsCount - completedSubtopicsCount}
            />

            {/* Phases Checklist */}
            <div className="space-y-8">
              {allPhases.map((phase) => (
                <PhaseSection
                  key={phase.phase || phase.title}
                  phase={phase}
                  roadmapId={roadmapId}
                  checkedMap={checkedMap}
                  onToggleSubtopic={handleToggleSubtopic}
                  onToggleTopic={handleToggleTopic}
                  onAddCustomTopic={handleAddCustomTopic}
                  onAddCustomSubtopic={handleAddCustomSubtopic}
                  onDeleteCustomTopic={handleDeleteCustomTopic}
                />
              ))}
            </div>

            {/* Reset Controls */}
            <ResetControls
              onResetProgress={() => resetProgress(roadmapId, isAuthenticated)}
              onResetEverything={() => resetEverything(roadmapId, isAuthenticated)}
            />
          </>
        ) : (
          /* Subtopic Identifier Guide */
          <div className="space-y-8">
            <div className="p-4 rounded-xl glass-panel border border-[var(--border)] text-xs font-mono text-[var(--muted)]">
              💡 Pattern Recognition Guide: Match problem statements with keywords and LeetCode problems to quickly identify the required algorithm or data structure.
            </div>

            {GUIDE_DATA.map((group, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-[var(--border)] space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
                  <span
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded text-black uppercase"
                    style={{ backgroundColor: group.phaseColor || 'var(--accent)' }}
                  >
                    {group.phase}
                  </span>
                  <h3 className="text-xl font-syne font-bold text-[var(--text)]">{group.topic}</h3>
                </div>

                <p className="text-xs font-mono text-[var(--accent)] italic">
                  <strong>Identification Signal:</strong> {group.identify}
                </p>

                {/* Subtopic details grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {(group.subs || []).map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-4 rounded-xl bg-[var(--surface2)] border border-[var(--border)] space-y-2"
                    >
                      <h4 className="font-syne font-bold text-sm text-[var(--text)]">{sub.name}</h4>
                      <p className="text-xs text-[var(--muted)] leading-relaxed">{sub.identify}</p>

                      {sub.keywords && sub.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {sub.keywords.map((kw, kIdx) => (
                            <span
                              key={kIdx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)]"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}

                      {sub.lc && sub.lc.length > 0 && (
                        <div className="pt-2 border-t border-[var(--border)] space-y-1">
                          <span className="text-[10px] font-mono text-[var(--muted)] block">
                            LeetCode Practice:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {sub.lc.map((prob, pIdx) => (
                              <a
                                key={pIdx}
                                href={`https://leetcode.com/problems/${prob.id}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-mono text-amber-400 hover:underline inline-flex items-center gap-1"
                              >
                                <span>{prob.n}</span>
                                <span className={`text-[9px] px-1 rounded uppercase ${prob.d === 'easy' ? 'text-green-400 border border-green-500/30' : prob.d === 'med' ? 'text-amber-400 border border-amber-500/30' : 'text-red-400 border border-red-500/30'}`}>
                                  {prob.d}
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </RoadmapLayout>
  );
};

export default DSAGuide;
