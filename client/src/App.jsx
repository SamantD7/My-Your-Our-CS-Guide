import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useUser, AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import Home from './pages/Home';
import DSAGuide from './pages/DSAGuide';
import AptitudeGuide from './pages/AptitudeGuide';
import WebDevGuide from './pages/WebDevGuide';
import AIEngineerGuide from './pages/AIEngineerGuide';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import { useProgressStore } from './store/progressStore';
import AnimatedBackground from './components/ui/AnimatedBackground';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { setClerkState } = useAuthStore();
  const { initTheme } = useThemeStore();
  const { syncGuestDataToClerk } = useProgressStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  useEffect(() => {
    setClerkState({ user, isSignedIn, isLoaded });
    if (isLoaded && isSignedIn) {
      syncGuestDataToClerk(true);
    }
  }, [user, isSignedIn, isLoaded, setClerkState, syncGuestDataToClerk]);

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <AnimatedBackground />
      <div className="relative z-10">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dsa" element={<DSAGuide />} />
          <Route path="/aptitude" element={<AptitudeGuide />} />
          <Route path="/webdev" element={<WebDevGuide />} />
          <Route path="/ai-engineer" element={<AIEngineerGuide />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signInForceRedirectUrl="/" signUpForceRedirectUrl="/" />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
