import { create } from 'zustand';

const getInitialLocalUser = () => {
  try {
    const saved = localStorage.getItem('myo_user_session');
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
};

const initialUser = getInitialLocalUser();

export const useAuthStore = create((set) => ({
  user: initialUser,
  isAuthenticated: !!initialUser,
  isLoaded: true,

  setClerkState: ({ user, isSignedIn, isLoaded }) => {
    if (isSignedIn && user) {
      const userData = {
        id: user.id,
        name: user.fullName || user.firstName || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User',
        email: user.primaryEmailAddress?.emailAddress || '',
        avatar: user.imageUrl || ''
      };
      try {
        localStorage.setItem('myo_user_session', JSON.stringify(userData));
      } catch (e) {}
      set({
        user: userData,
        isAuthenticated: true,
        isLoaded: !!isLoaded
      });
    } else if (isLoaded && !isSignedIn && !localStorage.getItem('myo_user_session')) {
      set({
        user: null,
        isAuthenticated: false,
        isLoaded: true
      });
    }
  },

  setLocalUser: (userData) => {
    const userObj = {
      id: userData.id || 'usr_' + Date.now(),
      name: userData.name || userData.email?.split('@')[0] || 'Student User',
      email: userData.email || 'user@example.com',
      avatar: userData.avatar || ''
    };
    try {
      localStorage.setItem('myo_user_session', JSON.stringify(userObj));
    } catch (e) {}
    set({
      user: userObj,
      isAuthenticated: true,
      isLoaded: true
    });
  },

  logout: () => {
    try {
      localStorage.removeItem('myo_user_session');
    } catch (e) {}
    set({ user: null, isAuthenticated: false, isLoaded: true });
  }
}));
