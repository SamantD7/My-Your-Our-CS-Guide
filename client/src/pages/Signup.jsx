import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiKey } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaMicrosoft, FaApple, FaDiscord, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useSignUp } from '@clerk/clerk-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import GlassCard from '../components/ui/GlassCard';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Email OTP verification state
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');

  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();

  // Social OAuth Signup
  const handleSocialSignup = async (strategy) => {
    if (!isLoaded || !signUp) {
      setErrorMsg('Clerk is initializing. Please verify VITE_CLERK_PUBLISHABLE_KEY in client/.env');
      return;
    }
    try {
      setErrorMsg('');
      setLoading(true);
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/'
      });
    } catch (err) {
      setErrorMsg(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'Social sign up failed');
      setLoading(false);
    }
  };

  // Form Submit - Create Account
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !email || !password || !confirmPassword) {
      setErrorMsg('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long');
      return;
    }

    if (!isLoaded || !signUp) {
      setErrorMsg('Clerk is initializing. Please verify VITE_CLERK_PUBLISHABLE_KEY in client/.env');
      return;
    }

    try {
      setLoading(true);
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || name;
      const lastName = nameParts.slice(1).join(' ') || '';

      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password
      });

      // Send verification email code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      const msg = err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'Signup failed';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify Email OTP Code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!verifyCode) {
      setErrorMsg('Please enter the 6-digit verification code');
      return;
    }

    if (!isLoaded || !signUp) return;

    try {
      setLoading(true);
      const result = await signUp.attemptEmailAddressVerification({
        code: verifyCode
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('/');
      } else {
        setErrorMsg('Verification incomplete. Please check code.');
      }
    } catch (err) {
      setErrorMsg(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const socialProviders = [
    { name: 'Google', icon: FcGoogle, strategy: 'oauth_google' },
    { name: 'GitHub', icon: FaGithub, strategy: 'oauth_github' },
    { name: 'Microsoft', icon: FaMicrosoft, strategy: 'oauth_microsoft' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-16 animated-mesh-bg relative overflow-hidden">
        {/* Floating Blobs */}
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[var(--accent2)]/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md relative z-10"
        >
          <GlassCard className="p-8 border border-[var(--border)] shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] p-0.5 mx-auto mb-4 shadow-lg">
                <div className="w-full h-full bg-[var(--surface)] rounded-[14px] flex items-center justify-center font-syne font-extrabold text-base gradient-text">
                  CS
                </div>
              </div>
              <h1 className="text-2xl font-syne font-extrabold text-[var(--text)] mb-1">
                {pendingVerification ? 'Verify Your Email' : 'Create Account'}
              </h1>
              <p className="text-xs font-mono text-[var(--muted)]">
                {pendingVerification
                  ? `Enter the verification code sent to ${email}`
                  : 'Join our community of Computer Science students'}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono text-center">
                {errorMsg}
              </div>
            )}

            {!isLoaded && (
              <div className="mb-6 p-2.5 rounded-xl bg-[var(--surface2)] border border-[var(--border)] text-[var(--muted)] text-[11px] font-mono text-center animate-pulse">
                Initializing authentication...
              </div>
            )}

            {/* Email OTP Verification Form */}
            {pendingVerification ? (
              <form onSubmit={handleVerifyCode} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono text-[var(--muted)] mb-1.5 font-medium">
                    Verification Code
                  </label>
                  <div className="relative">
                    <FiKey className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)] w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={verifyCode}
                      onChange={(e) => setVerifyCode(e.target.value)}
                      required
                      className="w-full bg-[var(--surface2)] border border-[var(--border)] focus:border-[var(--accent)] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[var(--text)] outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !isLoaded}
                  className="w-full py-3 rounded-xl bg-[var(--accent)] text-black font-syne font-bold text-xs hover:brightness-110 shadow-lg shadow-[var(--accent)]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <span>Verifying...</span> : <span>Verify & Complete Sign Up</span>}
                </button>
              </form>
            ) : (
              /* Standard Signup Form */
              <>
                {/* Social Signup Buttons */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {socialProviders.map((p) => {
                    const IconComp = p.icon;
                    return (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => handleSocialSignup(p.strategy)}
                        className="flex items-center justify-center p-2.5 rounded-xl glass-panel-subtle border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text)] transition-all"
                        title={`Sign up with ${p.name}`}
                      >
                        <IconComp className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center my-6">
                  <div className="flex-1 border-t border-[var(--border)]" />
                  <span className="px-3 text-[10px] font-mono text-[var(--muted)] uppercase">or register with email</span>
                  <div className="flex-1 border-t border-[var(--border)]" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-[var(--muted)] mb-1.5 font-medium">
                      Full Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)] w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Divyam Samant"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-[var(--surface2)] border border-[var(--border)] focus:border-[var(--accent)] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[var(--text)] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--muted)] mb-1.5 font-medium">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)] w-4 h-4" />
                      <input
                        type="email"
                        placeholder="student@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-[var(--surface2)] border border-[var(--border)] focus:border-[var(--accent)] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[var(--text)] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--muted)] mb-1.5 font-medium">
                      Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)] w-4 h-4" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-[var(--surface2)] border border-[var(--border)] focus:border-[var(--accent)] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[var(--text)] outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--text)]"
                      >
                        {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--muted)] mb-1.5 font-medium">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)] w-4 h-4" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full bg-[var(--surface2)] border border-[var(--border)] focus:border-[var(--accent)] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[var(--text)] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !isLoaded}
                    className="w-full py-3 rounded-xl bg-[var(--accent)] text-black font-syne font-bold text-xs hover:brightness-110 shadow-lg shadow-[var(--accent)]/20 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Creating Account...</span>
                    ) : (
                      <>
                        <span>Sign Up</span>
                        <FiArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}

            <div className="mt-8 text-center pt-6 border-t border-[var(--border)]">
              <p className="text-xs text-[var(--muted)]">
                Already have an account?{' '}
                <Link to="/login" className="text-[var(--accent)] font-semibold hover:underline">
                  Log in here
                </Link>
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
