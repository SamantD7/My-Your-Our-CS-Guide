import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoaded: false,

  setClerkState: ({ user, isSignedIn, isLoaded }) => {
    set({
      user: isSignedIn && user ? {
        id: user.id,
        name: user.fullName || user.firstName || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User',
        email: user.primaryEmailAddress?.emailAddress || '',
        avatar: user.imageUrl || ''
      } : null,
      isAuthenticated: !!isSignedIn,
      isLoaded: !!isLoaded
    });
  }
}));
