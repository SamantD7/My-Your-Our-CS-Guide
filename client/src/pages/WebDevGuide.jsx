import React, { useEffect } from 'react';
import RoadmapLayout from '../components/layout/RoadmapLayout';
import ProgressPanel from '../components/roadmap/ProgressPanel';
import TargetDatePlanner from '../components/roadmap/TargetDatePlanner';
import ResetControls from '../components/roadmap/ResetControls';
import SubtopicItem from '../components/roadmap/SubtopicItem';
import Badge from '../components/ui/Badge';
import { WEB_DEV_DATA } from '../data/webDevData';
import { useProgressStore } from '../store/progressStore';
import { useAuthStore } from '../store/authStore';
import { FiCheck, FiHelpCircle, FiGitBranch, FiBookOpen } from 'react-icons/fi';

const WebDevGuide = () => {
  const roadmapId = 'webdev';
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

  // Statistics calculation
  let totalTopicsCount = 0;
  let completedTopicsCount = 0;
  let totalSubtopicsCount = 0;
  let completedSubtopicsCount = 0;

  WEB_DEV_DATA.forEach((module) => {
    (module.topics || []).forEach((topic, tIdx) => {
      totalTopicsCount += 1;
      const subKeys = (topic.sub || []).map((_, sIdx) => `web_${module.id}_${tIdx}_sub_${sIdx}`);
      const checkedSubs = subKeys.filter((k) => checkedMap[k]);

      totalSubtopicsCount += subKeys.length;
      completedSubtopicsCount += checkedSubs.length;

      if (subKeys.length > 0 && checkedSubs.length === subKeys.length) {
        completedTopicsCount += 1;
      }
    });
  });

  const overallPct = totalSubtopicsCount > 0 ? (completedSubtopicsCount / totalSubtopicsCount) * 100 : 0;

  const sidebarSections = WEB_DEV_DATA.map((module) => ({
    id: `mod_${module.id}`,
    title: `${module.num}. ${module.title}`,
    badge: false
  }));

  const handleToggleSubtopic = (itemKey) => {
    toggleCheck(roadmapId, itemKey, isAuthenticated);
  };

  const handleToggleTopic = (subKeys, targetState) => {
    const updates = {};
    subKeys.forEach((k) => {
      updates[k] = targetState;
    });
    setMultipleChecks(roadmapId, updates, isAuthenticated);
  };

  return (
    <RoadmapLayout sections={sidebarSections} roadmapId={roadmapId} overallProgress={overallPct}>
      <div className="space-y-6">
        {/* Title Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-syne font-extrabold gradient-text mb-2">
            Web Development Concepts
          </h1>
          <p className="text-xs sm:text-sm font-mono text-[var(--muted)]">
            Core web architecture, browser internals, HTTP, security & backend interview deep dives from data3.txt
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 p-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)] text-xs font-mono">
          <span className="text-[var(--muted)] font-bold">Priority Legend:</span>
          <Badge type="must">Must Know</Badge>
          <Badge type="important">Important</Badge>
          <Badge type="good">Good to Know</Badge>
        </div>

        {/* Progress Analytics & Target Date */}
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

        {/* Modules List */}
        <div className="space-y-12">
          {WEB_DEV_DATA.map((module) => (
            <div key={module.id} id={`mod_${module.id}`} className="space-y-6 scroll-mt-24">
              {/* Module Header */}
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
                <span className="font-mono text-sm font-bold text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/30 px-3 py-1 rounded-lg">
                  {module.num}
                </span>
                <h2 className="text-2xl font-syne font-extrabold text-[var(--text)]">
                  {module.title}
                </h2>
              </div>

              {/* Module Topics */}
              <div className="space-y-6">
                {(module.topics || []).map((topic, tIdx) => {
                  const subKeys = (topic.sub || []).map(
                    (_, sIdx) => `web_${module.id}_${tIdx}_sub_${sIdx}`
                  );
                  const completedSubs = subKeys.filter((k) => checkedMap[k]).length;
                  const isAllChecked = subKeys.length > 0 && completedSubs === subKeys.length;

                  return (
                    <div
                      key={tIdx}
                      className="glass-panel p-6 rounded-2xl border border-[var(--border)] space-y-4"
                    >
                      {/* Topic Header with Priority Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleToggleTopic(subKeys, !isAllChecked)}
                            className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                              isAllChecked
                                ? 'bg-[var(--accent)] border-[var(--accent)] text-black'
                                : 'border-[var(--muted)] hover:border-[var(--accent)] bg-transparent'
                            }`}
                          >
                            {isAllChecked && <FiCheck className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3
                                className={`font-syne font-bold text-base sm:text-lg ${
                                  isAllChecked ? 'line-through text-[var(--muted)]' : 'text-[var(--text)]'
                                }`}
                              >
                                {topic.name}
                              </h3>
                              {topic.priority && <Badge type={topic.priority}>{topic.priority}</Badge>}
                            </div>
                          </div>
                        </div>

                        <span className="font-mono text-xs text-[var(--muted)] bg-[var(--surface2)] px-2.5 py-1 rounded border border-[var(--border)]">
                          {completedSubs}/{subKeys.length}
                        </span>
                      </div>

                      {/* Architecture / Flow Diagram if available */}
                      {topic.flow && (
                        <div className="p-4 rounded-xl bg-[#090d12] border border-[var(--border)] font-mono text-xs text-cyan-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                          <div className="flex items-center gap-2 text-[var(--muted)] text-[10px] uppercase tracking-wider mb-2 font-bold">
                            <FiGitBranch />
                            <span>Execution / Flow Diagram</span>
                          </div>
                          {topic.flow}
                        </div>
                      )}

                      {/* Subtopics Checklist */}
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-[var(--accent)] uppercase font-bold block mb-2">
                          Core Concepts Checklist:
                        </span>
                        {(topic.sub || []).map((sub, sIdx) => {
                          const itemKey = `web_${module.id}_${tIdx}_sub_${sIdx}`;
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

                      {/* What you should understand */}
                      {topic.understand && topic.understand.length > 0 && (
                        <div className="p-4 rounded-xl bg-[var(--surface2)] border border-[var(--border)] space-y-2">
                          <span className="text-[11px] font-mono text-[var(--accent2)] uppercase font-bold flex items-center gap-1.5">
                            <FiBookOpen />
                            <span>What You Should Understand:</span>
                          </span>
                          <ul className="text-xs text-[var(--muted)] space-y-1.5 list-disc list-inside leading-relaxed">
                            {topic.understand.map((item, uIdx) => (
                              <li key={uIdx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Frequently Asked Interview Questions */}
                      {topic.qs && topic.qs.length > 0 && (
                        <div className="p-4 rounded-xl bg-[var(--surface2)]/60 border border-[var(--border)] space-y-2">
                          <span className="text-[11px] font-mono text-amber-400 uppercase font-bold flex items-center gap-1.5">
                            <FiHelpCircle />
                            <span>Interview Questions:</span>
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {topic.qs.map((q, qIdx) => (
                              <div
                                key={qIdx}
                                className="text-xs font-mono text-[var(--text)] bg-[var(--surface)] p-2.5 rounded-lg border border-[var(--border)]"
                              >
                                {q}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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

export default WebDevGuide;
