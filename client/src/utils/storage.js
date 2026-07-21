const PROGRESS_PREFIX = 'myo_progress_';
const TARGET_PREFIX = 'myo_target_';
const CUSTOM_TOPICS_PREFIX = 'myo_custom_topics_';
const THEME_KEY = 'myo_theme';

export const getLocalProgress = (roadmapId) => {
  try {
    const data = localStorage.getItem(`${PROGRESS_PREFIX}${roadmapId}`);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
};

export const setLocalProgress = (roadmapId, checkedMap) => {
  try {
    localStorage.setItem(`${PROGRESS_PREFIX}${roadmapId}`, JSON.stringify(checkedMap));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
};

export const clearLocalProgress = (roadmapId) => {
  try {
    if (roadmapId) {
      localStorage.removeItem(`${PROGRESS_PREFIX}${roadmapId}`);
    } else {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(PROGRESS_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    }
  } catch (e) {
    console.error('Failed to clear progress', e);
  }
};

export const getLocalTarget = (roadmapId) => {
  try {
    return localStorage.getItem(`${TARGET_PREFIX}${roadmapId}`) || '';
  } catch (e) {
    return '';
  }
};

export const setLocalTarget = (roadmapId, dateStr) => {
  try {
    if (dateStr) {
      localStorage.setItem(`${TARGET_PREFIX}${roadmapId}`, dateStr);
    } else {
      localStorage.removeItem(`${TARGET_PREFIX}${roadmapId}`);
    }
  } catch (e) {
    console.error('Failed to set target date', e);
  }
};

export const getLocalCustomTopics = (roadmapId) => {
  try {
    const data = localStorage.getItem(`${CUSTOM_TOPICS_PREFIX}${roadmapId}`);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const setLocalCustomTopics = (roadmapId, topics) => {
  try {
    localStorage.setItem(`${CUSTOM_TOPICS_PREFIX}${roadmapId}`, JSON.stringify(topics));
  } catch (e) {
    console.error('Failed to save custom topics', e);
  }
};

export const clearLocalCustomTopics = (roadmapId) => {
  try {
    if (roadmapId) {
      localStorage.removeItem(`${CUSTOM_TOPICS_PREFIX}${roadmapId}`);
    } else {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(CUSTOM_TOPICS_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    }
  } catch (e) {
    console.error('Failed to clear custom topics', e);
  }
};

export const getLocalTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY) || 'dark';
  } catch (e) {
    return 'dark';
  }
};

export const setLocalTheme = (theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error('Failed to save theme', e);
  }
};
