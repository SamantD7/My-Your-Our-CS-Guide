import React, { useEffect, useState } from 'react';
import RoadmapLayout from '../components/layout/RoadmapLayout';
import ProgressPanel from '../components/roadmap/ProgressPanel';
import TargetDatePlanner from '../components/roadmap/TargetDatePlanner';
import ResetControls from '../components/roadmap/ResetControls';
import SubtopicItem from '../components/roadmap/SubtopicItem';
import { APT_DATA } from '../data/aptitudeData';
import { useProgressStore } from '../store/progressStore';
import { useAuthStore } from '../store/authStore';
import { FiChevronRight, FiCheck } from 'react-icons/fi';

const AptitudeGuide = () => {
  const [activeSection, setActiveSection] = useState('Quantitative'); // 'Quantitative' | 'Logical Reasoning' | 'Verbal Ability'
  const roadmapId = 'aptitude';

  const { isAuthenticated } = useAuthStore();
  const {
    progressMap,
    targetMap,
    loadRoadmapState,
    toggleCheck,
    setMultipleChecks,
    setTargetDate,
    resetProgress,
    resetEverything
  } = useProgressStore();

  useEffect(() => {
    loadRoadmapState(roadmapId, isAuthenticated);
  }, [roadmapId, isAuthenticated, loadRoadmapState]);

  const checkedMap = progressMap[roadmapId] || {};
  const targetDate = targetMap[roadmapId] || '';

  const activeSecData = APT_DATA.find((s) => s.sec === activeSection) || APT_DATA[0];

  // Calculate statistics across all sections
  let totalTopicsCount = 0;
  let completedTopicsCount = 0;
  let totalSubtopicsCount = 0;
  let completedSubtopicsCount = 0;

  APT_DATA.forEach((sec) => {
    (sec.phases || []).forEach((phase) => {
      (phase.topics || []).forEach((topic) => {
        totalTopicsCount += 1;
        const subKeys = (topic.syl || topic.s || []).map((_, idx) => `apt_${topic.n}_sub_${idx}`);
        const checkedSubs = subKeys.filter((k) => checkedMap[k]);

        totalSubtopicsCount += subKeys.length;
        completedSubtopicsCount += checkedSubs.length;

        if (subKeys.length > 0 && checkedSubs.length === subKeys.length) {
          completedTopicsCount += 1;
        }
      });
    });
  });

  const overallPct = totalSubtopicsCount > 0 ? (completedSubtopicsCount / totalSubtopicsCount) * 100 : 0;

  const sidebarSections = (activeSecData.phases || []).map((phase, pIdx) => ({
    id: `apt_phase_${pIdx}`,
    title: phase.label,
    badge: true,
    badgeColor: activeSecData.color
  }));

  const handleToggleSubtopic = (itemKey) => {
    toggleCheck(roadmapId, itemKey, isAuthenticated);
  };

  const handleToggleTopic = (topicN, subKeys, targetState) => {
    const updates = {};
    subKeys.forEach((key) => {
      updates[key] = targetState;
    });
    setMultipleChecks(roadmapId, updates, isAuthenticated);
  };

  return (
    <RoadmapLayout sections={sidebarSections} roadmapId={roadmapId} overallProgress={overallPct}>
      <div className="space-y-6">
        {/* Title Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-syne font-extrabold gradient-text mb-2">
            Aptitude & Logical Reasoning Guide
          </h1>
          <p className="text-xs sm:text-sm font-mono text-[var(--muted)]">
            Comprehensive quantitative, logical reasoning, and verbal ability material for campus placements
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex bg-[var(--surface2)] border border-[var(--border)] p-1 rounded-xl max-w-xl">
          {APT_DATA.map((sec) => (
            <button
              key={sec.sec}
              onClick={() => setActiveSection(sec.sec)}
              className={`flex-1 py-2.5 rounded-lg text-xs font-syne font-bold transition-all ${
                activeSection === sec.sec
                  ? 'bg-[var(--surface)] text-[var(--text)] shadow-sm border border-[var(--border)]'
                  : 'text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              {sec.sec}
            </button>
          ))}
        </div>

        {/* Progress Panel & Target Date Planner */}
        <ProgressPanel
          totalTopics={totalTopicsCount}
          completedTopics={completedTopicsCount}
          totalSubtopics={totalSubtopicsCount}
          completedSubtopics={completedSubtopicsCount}
        />

        <TargetDatePlanner
          targetDate={targetDate}
          onSetTargetDate={(date) => setTargetDate(roadmapId, date, isAuthenticated)}
          remainingTopics={totalTopicsCount - completedTopicsCount}
          remainingSubtopics={totalSubtopicsCount - completedSubtopicsCount}
        />

        {/* Phases for Selected Section */}
        <div className="space-y-10">
          {(activeSecData.phases || []).map((phase, pIdx) => (
            <div key={pIdx} id={`apt_phase_${pIdx}`} className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3 pb-2 border-b border-[var(--border)]">
                <span
                  className="px-2.5 py-1 rounded text-xs font-mono font-bold text-black uppercase"
                  style={{ backgroundColor: activeSecData.color }}
                >
                  {phase.label}
                </span>
              </div>

              <div className="space-y-4">
                {(phase.topics || []).map((topic) => {
                  const subKeys = (topic.syl || []).map((_, idx) => `apt_${topic.n}_sub_${idx}`);
                  const completedSubs = subKeys.filter((k) => checkedMap[k]).length;
                  const isAllChecked = subKeys.length > 0 && completedSubs === subKeys.length;

                  return (
                    <div
                      key={topic.n}
                      className="glass-panel p-5 rounded-2xl border border-[var(--border)] space-y-4"
                    >
                      {/* Topic Title & Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              handleToggleTopic(topic.n, subKeys, !isAllChecked)
                            }
                            className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                              isAllChecked
                                ? 'bg-[var(--accent)] border-[var(--accent)] text-black'
                                : 'border-[var(--muted)] hover:border-[var(--accent)] bg-transparent'
                            }`}
                          >
                            {isAllChecked && <FiCheck className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>
                          <div>
                            <h3
                              className={`font-syne font-bold text-base ${
                                isAllChecked ? 'line-through text-[var(--muted)]' : 'text-[var(--text)]'
                              }`}
                            >
                              {topic.n}. {topic.t}
                            </h3>
                            <p className="text-xs font-mono text-[var(--muted)]">{topic.s}</p>
                          </div>
                        </div>

                        <span className="font-mono text-xs text-[var(--muted)] bg-[var(--surface2)] px-2.5 py-1 rounded border border-[var(--border)]">
                          {completedSubs}/{subKeys.length}
                        </span>
                      </div>

                      {/* Definition */}
                      {topic.def && (
                        <p className="text-xs text-[var(--muted)] bg-[var(--surface2)]/60 p-3 rounded-xl border border-[var(--border)] leading-relaxed">
                          {topic.def}
                        </p>
                      )}

                      {/* Syllabus / Subtopics Checklist */}
                      <div className="space-y-1 pt-1">
                        <span className="text-[11px] font-mono text-[var(--accent)] uppercase font-bold block mb-2">
                          Detailed Concepts & Syllabus:
                        </span>
                        {(topic.syl || []).map((sub, idx) => {
                          const itemKey = `apt_${topic.n}_sub_${idx}`;
                          return (
                            <SubtopicItem
                              key={itemKey}
                              itemKey={itemKey}
                              text={sub}
                              isChecked={!!checkedMap[itemKey]}
                              onToggle={handleToggleSubtopic}
                            />
                          );
                        })}
                      </div>

                      {/* Shortcuts & Question Types */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                        {topic.p && topic.p.length > 0 && (
                          <div className="p-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)]">
                            <span className="text-[10px] font-mono text-[var(--warn)] uppercase font-bold block mb-1">
                              ⚡ Shortcut Tricks & Patterns:
                            </span>
                            <ul className="text-xs text-[var(--muted)] space-y-1 list-disc list-inside">
                              {topic.p.map((pat, pIdx) => (
                                <li key={pIdx}>{pat}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {topic.q && topic.q.length > 0 && (
                          <div className="p-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)]">
                            <span className="text-[10px] font-mono text-[var(--accent2)] uppercase font-bold block mb-1">
                              ❓ Common Exam Question Types:
                            </span>
                            <ul className="text-xs text-[var(--muted)] space-y-1 list-disc list-inside">
                              {topic.q.map((qItem, qIdx) => (
                                <li key={qIdx}>{qItem}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <ResetControls
          onResetProgress={() => resetProgress(roadmapId, isAuthenticated)}
          onResetEverything={() => resetEverything(roadmapId, isAuthenticated)}
        />
      </div>
    </RoadmapLayout>
  );
};

export default AptitudeGuide;
