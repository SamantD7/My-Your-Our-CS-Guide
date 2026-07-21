import React, { useEffect } from 'react';
import RoadmapLayout from '../components/layout/RoadmapLayout';
import ProgressPanel from '../components/roadmap/ProgressPanel';
import TargetDatePlanner from '../components/roadmap/TargetDatePlanner';
import ResetControls from '../components/roadmap/ResetControls';
import SubtopicItem from '../components/roadmap/SubtopicItem';
import { AI_ENGINEER_DATA } from '../data/aiEngineerData';
import { useProgressStore } from '../store/progressStore';
import { useAuthStore } from '../store/authStore';
import { FiCheck, FiCpu, FiCode, FiLayers, FiTerminal } from 'react-icons/fi';

const AIEngineerGuide = () => {
  const roadmapId = 'ai-engineer';
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

  AI_ENGINEER_DATA.forEach((phase, pIdx) => {
    (phase.sections || []).forEach((sec, sIdx) => {
      (sec.topics || []).forEach((topic, tIdx) => {
        totalTopicsCount += 1;
        const itemKey = `ai_p${pIdx}_s${sIdx}_t${tIdx}`;
        totalSubtopicsCount += 1;

        if (checkedMap[itemKey]) {
          completedSubtopicsCount += 1;
        }

        if (checkedMap[itemKey]) {
          completedTopicsCount += 1;
        }
      });
    });
  });

  const overallPct = totalSubtopicsCount > 0 ? (completedSubtopicsCount / totalSubtopicsCount) * 100 : 0;

  const sidebarSections = AI_ENGINEER_DATA.map((phase) => ({
    id: `ai_phase_${phase.n}`,
    title: `${phase.n}. ${phase.title}`,
    badge: true,
    badgeColor: phase.project?.color || '#534AB7'
  }));

  const handleToggleSubtopic = (itemKey) => {
    toggleCheck(roadmapId, itemKey, isAuthenticated);
  };

  const handleTogglePhaseTopics = (phaseIndex, targetState) => {
    const updates = {};
    const phase = AI_ENGINEER_DATA[phaseIndex];
    (phase.sections || []).forEach((sec, sIdx) => {
      (sec.topics || []).forEach((_, tIdx) => {
        const itemKey = `ai_p${phaseIndex}_s${sIdx}_t${tIdx}`;
        updates[itemKey] = targetState;
      });
    });
    setMultipleChecks(roadmapId, updates, isAuthenticated);
  };

  return (
    <RoadmapLayout sections={sidebarSections} roadmapId={roadmapId} overallProgress={overallPct}>
      <div className="space-y-6">
        {/* Title Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-syne font-extrabold gradient-text mb-2">
            Full Stack AI Engineer Roadmap
          </h1>
          <p className="text-xs sm:text-sm font-mono text-[var(--muted)]">
            GenAI + RAG specialization: Python, MERN, LLMs, Embeddings, ChromaDB, RAG, and AI Agents
          </p>
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

        {/* Phases List */}
        <div className="space-y-12">
          {AI_ENGINEER_DATA.map((phase, pIdx) => {
            let phaseTotalSubs = 0;
            let phaseCompletedSubs = 0;

            (phase.sections || []).forEach((sec, sIdx) => {
              (sec.topics || []).forEach((topic, tIdx) => {
                phaseTotalSubs += 1;
                const itemKey = `ai_p${pIdx}_s${sIdx}_t${tIdx}`;
                if (checkedMap[itemKey]) {
                  phaseCompletedSubs += 1;
                }
              });
            });

            const isPhaseAllDone = phaseTotalSubs > 0 && phaseCompletedSubs === phaseTotalSubs;

            return (
              <div key={pIdx} id={`ai_phase_${phase.n}`} className="space-y-6 scroll-mt-24">
                {/* Phase Header Card */}
                <div className="glass-panel p-6 rounded-2xl border border-[var(--border)] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--border)]">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleTogglePhaseTopics(pIdx, !isPhaseAllDone)}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center font-mono font-bold text-xs transition-all ${
                          isPhaseAllDone
                            ? 'bg-[var(--accent)] border-[var(--accent)] text-black'
                            : 'border-[var(--muted)] hover:border-[var(--accent)] text-[var(--muted)]'
                        }`}
                      >
                        {isPhaseAllDone ? <FiCheck className="w-4 h-4 stroke-[3]" /> : phase.n}
                      </button>

                      <div>
                        <h2 className="text-xl sm:text-2xl font-syne font-extrabold text-[var(--text)]">
                          {phase.title}
                        </h2>
                        <p className="text-xs font-mono text-[var(--muted)]">{phase.sub}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {phase.badge && (
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border"
                          style={{
                            backgroundColor: phase.badgeBg,
                            color: phase.badgeC,
                            borderColor: phase.badgeC
                          }}
                        >
                          {phase.badge}
                        </span>
                      )}
                      {phase.timeTxt && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-[var(--surface2)] text-[var(--muted)] border border-[var(--border)]">
                          {phase.timeTxt}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Sections and Topics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {(phase.sections || []).map((sec, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-4 rounded-xl bg-[var(--surface2)] border border-[var(--border)] space-y-3"
                      >
                        <h3 className="font-syne font-bold text-sm text-[var(--accent)] border-b border-[var(--border)] pb-2">
                          {sec.title}
                        </h3>

                        <div className="space-y-2">
                          {(sec.topics || []).map((topic, tIdx) => {
                            const itemKey = `ai_p${pIdx}_s${sIdx}_t${tIdx}`;
                            const isChecked = !!checkedMap[itemKey];

                            return (
                              <div
                                key={tIdx}
                                onClick={() => handleToggleSubtopic(itemKey)}
                                className="flex items-start gap-2 cursor-pointer p-1.5 rounded hover:bg-[var(--surface)]/50 transition-colors"
                              >
                                <div
                                  className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center flex-shrink-0 transition-all ${
                                    isChecked
                                      ? 'bg-[var(--accent)] border-[var(--accent)] text-black'
                                      : 'border-[var(--muted)] hover:border-[var(--accent)] bg-transparent'
                                  }`}
                                >
                                  {isChecked && <FiCheck className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <div className="text-xs">
                                  <span
                                    className={`font-bold block ${
                                      isChecked ? 'line-through text-[var(--muted)]' : 'text-[var(--text)]'
                                    }`}
                                  >
                                    {topic.name}
                                  </span>
                                  <span className="text-[var(--muted)] text-[11px]">
                                    {topic.detail}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Milestone Project Card */}
                  {phase.project && (
                    <div
                      className="p-4 rounded-xl border space-y-2"
                      style={{
                        backgroundColor: phase.project.bg || 'var(--surface2)',
                        borderColor: phase.project.color || 'var(--border)'
                      }}
                    >
                      <div className="flex items-center gap-2 text-xs font-mono font-bold" style={{ color: phase.project.color }}>
                        <FiCpu className="w-4 h-4" />
                        <span>Milestone Capstone Project:</span>
                      </div>
                      <p className="text-xs sm:text-sm font-syne font-bold text-[var(--text)]">
                        {phase.project.name}
                      </p>
                    </div>
                  )}

                  {/* Interview Prompt & Learning Resources */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {phase.resources && phase.resources.length > 0 && (
                      <div className="p-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)]">
                        <span className="text-[10px] font-mono text-[var(--accent)] uppercase font-bold block mb-1">
                          📚 Key Learning Resources:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {phase.resources.map((res, rIdx) => (
                            <span
                              key={rIdx}
                              className="text-xs font-mono bg-[var(--surface)] border border-[var(--border)] px-2.5 py-1 rounded text-[var(--muted)]"
                            >
                              {res}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {phase.prompt && (
                      <div className="p-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)]">
                        <span className="text-[10px] font-mono text-amber-400 uppercase font-bold flex items-center gap-1 mb-1">
                          <FiTerminal />
                          <span>Recommended AI Prompt:</span>
                        </span>
                        <p className="text-xs font-mono text-[var(--text)] italic bg-[var(--surface)] p-2 rounded border border-[var(--border)]">
                          "{phase.prompt}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <ResetControls
          onResetProgress={() => resetProgress(roadmapId, isAuthenticated)}
          onResetEverything={() => resetEverything(roadmapId, isAuthenticated)}
        />
      </div>
    </RoadmapLayout>
  );
};

export default AIEngineerGuide;
