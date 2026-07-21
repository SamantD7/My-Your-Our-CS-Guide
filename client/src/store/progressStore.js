import { create } from 'zustand';
import api from '../utils/api';
import {
  getLocalProgress,
  setLocalProgress,
  clearLocalProgress,
  getLocalTarget,
  setLocalTarget,
  getLocalCustomTopics,
  setLocalCustomTopics,
  clearLocalCustomTopics
} from '../utils/storage';

export const useProgressStore = create((set, get) => ({
  progressMap: {}, // { dsa: { itemKey: true }, aptitude: {}, ... }
  targetMap: {},   // { dsa: '2026-12-31', ... }
  customTopicsMap: {}, // { dsa: [ { id, name, subs: [] } ], ... }

  // Sync guest Local Storage data to Clerk backend upon authentication
  syncGuestDataToClerk: async (isAuthenticated) => {
    if (!isAuthenticated) return;
    const roadmaps = ['dsa', 'aptitude', 'webdev', 'ai-engineer'];
    for (const rid of roadmaps) {
      const localChecked = getLocalProgress(rid);
      const localTarget = getLocalTarget(rid);
      const localCustom = getLocalCustomTopics(rid);

      if (Object.keys(localChecked).length > 0) {
        try {
          const res = await api.get(`/progress/${rid}`).catch(() => null);
          const remoteChecked = res?.data?.progress?.[rid] || {};
          const merged = { ...remoteChecked, ...localChecked };
          await api.put('/progress', { roadmapId: rid, checkedItems: merged });
          setLocalProgress(rid, merged);
          set((state) => ({
            progressMap: { ...state.progressMap, [rid]: merged }
          }));
        } catch (e) {
          // Fallback handled gracefully
        }
      }

      if (localTarget) {
        try {
          await api.put('/target', { roadmapId: rid, targetDate: localTarget });
        } catch (e) {
          // Fallback handled gracefully
        }
      }

      if (Array.isArray(localCustom) && localCustom.length > 0) {
        for (const t of localCustom) {
          if (t.isCustom && t.name) {
            try {
              await api.post('/topics', { roadmapId: rid, name: t.name, subs: t.subs || [] });
            } catch (e) {
              // Fallback handled gracefully
            }
          }
        }
      }
    }
  },

  // Load progress for a specific roadmap
  loadRoadmapState: async (roadmapId, isAuthenticated) => {
    // First load local storage state
    const localChecked = getLocalProgress(roadmapId);
    const localTarget = getLocalTarget(roadmapId);
    const localCustom = getLocalCustomTopics(roadmapId);

    set((state) => ({
      progressMap: { ...state.progressMap, [roadmapId]: localChecked },
      targetMap: { ...state.targetMap, [roadmapId]: localTarget },
      customTopicsMap: { ...state.customTopicsMap, [roadmapId]: localCustom }
    }));

    // If authenticated, sync with backend
    if (isAuthenticated) {
      try {
        const [progRes, targetRes, topicRes] = await Promise.all([
          api.get(`/progress/${roadmapId}`).catch(() => null),
          api.get('/target').catch(() => null),
          api.get(`/topics/${roadmapId}`).catch(() => null)
        ]);

        if (progRes?.data?.success && progRes.data.progress?.[roadmapId]) {
          const remoteChecked = progRes.data.progress[roadmapId];
          const mergedChecked = { ...localChecked, ...remoteChecked };
          setLocalProgress(roadmapId, mergedChecked);
          set((state) => ({
            progressMap: { ...state.progressMap, [roadmapId]: mergedChecked }
          }));
        }

        if (targetRes?.data?.success && targetRes.data.targetDates) {
          const remoteTarget = targetRes.data.targetDates[roadmapId] || localTarget || '';
          setLocalTarget(roadmapId, remoteTarget);
          set((state) => ({
            targetMap: { ...state.targetMap, [roadmapId]: remoteTarget }
          }));
        }

        if (topicRes?.data?.success && topicRes.data.topics) {
          const remoteCustom = topicRes.data.topics.map((t) => ({
            id: t._id,
            name: t.name,
            subs: t.subs || [],
            isCustom: true
          }));
          setLocalCustomTopics(roadmapId, remoteCustom);
          set((state) => ({
            customTopicsMap: { ...state.customTopicsMap, [roadmapId]: remoteCustom }
          }));
        }
      } catch (err) {
        console.error('Error syncing with backend:', err);
      }
    }
  },

  // Toggle item check state
  toggleCheck: async (roadmapId, itemKey, isAuthenticated) => {
    const currentRoadmapProgress = get().progressMap[roadmapId] || {};
    const newRoadmapProgress = {
      ...currentRoadmapProgress,
      [itemKey]: !currentRoadmapProgress[itemKey]
    };

    set((state) => ({
      progressMap: { ...state.progressMap, [roadmapId]: newRoadmapProgress }
    }));

    setLocalProgress(roadmapId, newRoadmapProgress);

    if (isAuthenticated) {
      try {
        await api.put('/progress', {
          roadmapId,
          checkedItems: newRoadmapProgress
        });
      } catch (err) {
        console.error('Failed to sync progress to backend', err);
      }
    }
  },

  // Check/uncheck multiple items at once
  setMultipleChecks: async (roadmapId, checkMapUpdates, isAuthenticated) => {
    const currentRoadmapProgress = get().progressMap[roadmapId] || {};
    const newRoadmapProgress = {
      ...currentRoadmapProgress,
      ...checkMapUpdates
    };

    set((state) => ({
      progressMap: { ...state.progressMap, [roadmapId]: newRoadmapProgress }
    }));

    setLocalProgress(roadmapId, newRoadmapProgress);

    if (isAuthenticated) {
      try {
        await api.put('/progress', {
          roadmapId,
          checkedItems: newRoadmapProgress
        });
      } catch (err) {
        console.error('Failed to sync progress batch to backend', err);
      }
    }
  },

  // Target date setter
  setTargetDate: async (roadmapId, dateStr, isAuthenticated) => {
    set((state) => ({
      targetMap: { ...state.targetMap, [roadmapId]: dateStr }
    }));

    setLocalTarget(roadmapId, dateStr);

    if (isAuthenticated) {
      try {
        await api.put('/target', { roadmapId, targetDate: dateStr });
      } catch (err) {
        console.error('Failed to sync target date', err);
      }
    }
  },

  // Custom Topic operations
  addCustomTopic: async (roadmapId, topicName, subs = [], isAuthenticated) => {
    const currentCustom = get().customTopicsMap[roadmapId] || [];
    const tempId = `custom_${Date.now()}`;
    const newTopicObj = { id: tempId, name: topicName, subs, isCustom: true };

    const updatedCustom = [...currentCustom, newTopicObj];

    set((state) => ({
      customTopicsMap: { ...state.customTopicsMap, [roadmapId]: updatedCustom }
    }));

    setLocalCustomTopics(roadmapId, updatedCustom);

    if (isAuthenticated) {
      try {
        const res = await api.post('/topics', { roadmapId, name: topicName, subs });
        if (res.data?.success && res.data.topic) {
          const serverId = res.data.topic._id;
          const finalizedCustom = updatedCustom.map((t) =>
            t.id === tempId ? { ...t, id: serverId } : t
          );
          set((state) => ({
            customTopicsMap: { ...state.customTopicsMap, [roadmapId]: finalizedCustom }
          }));
          setLocalCustomTopics(roadmapId, finalizedCustom);
        }
      } catch (err) {
        console.error('Failed to add topic on backend', err);
      }
    }
  },

  addCustomSubtopic: async (roadmapId, topicId, subtopicText, isAuthenticated) => {
    const currentCustom = get().customTopicsMap[roadmapId] || [];
    const updatedCustom = currentCustom.map((topic) => {
      if (topic.id === topicId) {
        return { ...topic, subs: [...topic.subs, subtopicText] };
      }
      return topic;
    });

    set((state) => ({
      customTopicsMap: { ...state.customTopicsMap, [roadmapId]: updatedCustom }
    }));

    setLocalCustomTopics(roadmapId, updatedCustom);

    if (isAuthenticated) {
      try {
        await api.post('/topics', { roadmapId, topicId, newSub: subtopicText });
      } catch (err) {
        console.error('Failed to add subtopic on backend', err);
      }
    }
  },

  deleteCustomTopic: async (roadmapId, topicId, isAuthenticated) => {
    const currentCustom = get().customTopicsMap[roadmapId] || [];
    const updatedCustom = currentCustom.filter((t) => t.id !== topicId);

    set((state) => ({
      customTopicsMap: { ...state.customTopicsMap, [roadmapId]: updatedCustom }
    }));

    setLocalCustomTopics(roadmapId, updatedCustom);

    if (isAuthenticated) {
      try {
        await api.delete('/topics', { data: { topicId, roadmapId } });
      } catch (err) {
        console.error('Failed to delete topic from backend', err);
      }
    }
  },

  // Reset progress
  resetProgress: async (roadmapId, isAuthenticated) => {
    set((state) => ({
      progressMap: { ...state.progressMap, [roadmapId]: {} }
    }));

    setLocalProgress(roadmapId, {});

    if (isAuthenticated) {
      try {
        await api.delete(`/progress?roadmapId=${roadmapId}`);
      } catch (err) {
        console.error('Failed to reset progress on backend', err);
      }
    }
  },

  // Reset everything
  resetEverything: async (roadmapId, isAuthenticated) => {
    set((state) => ({
      progressMap: { ...state.progressMap, [roadmapId]: {} },
      targetMap: { ...state.targetMap, [roadmapId]: '' },
      customTopicsMap: { ...state.customTopicsMap, [roadmapId]: [] }
    }));

    clearLocalProgress(roadmapId);
    setLocalTarget(roadmapId, '');
    clearLocalCustomTopics(roadmapId);

    if (isAuthenticated) {
      try {
        await Promise.all([
          api.delete(`/progress?roadmapId=${roadmapId}`),
          api.put('/target', { roadmapId, targetDate: '' }),
          api.delete('/topics', { data: { roadmapId, resetAll: true } })
        ]);
      } catch (err) {
        console.error('Failed to reset everything on backend', err);
      }
    }
  }
}));
