import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Technologies', href: '#technologies' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (name: string, href: string) => {
    setActiveLink(name);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href.replace('#', ''));
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('Home', '#home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
            id="brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
              DS
            </div>
            <div className="flex items-baseline font-bold text-xl tracking-tight">
              <span className="text-slate-900">Dev</span>
              <span className="text-theme-gradient ml-1">Stack</span>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.name, link.href);
                  const el = document.querySelector(link.href);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                  activeLink === link.name
                    ? 'text-pink-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.name}
                {activeLink === link.name && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Right Side Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              id="signin-btn"
              onClick={() => setAuthModal('signin')}
              className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 transition-colors cursor-pointer"
            >
              Sign In
            </button>

            <button
              type="button"
              id="signup-btn"
              onClick={() => setAuthModal('signup')}
              className="bg-theme-gradient text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-md shadow-pink-500/20 hover:opacity-95 hover:shadow-pink-500/30 active:scale-95 transition-all cursor-pointer"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.name, link.href);
                    const el = document.querySelector(link.href);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    activeLink === link.name
                      ? 'bg-pink-50 text-pink-600 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModal('signin');
                }}
                className="w-full text-center py-2.5 text-slate-700 font-medium hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModal('signup');
                }}
                className="w-full bg-theme-gradient text-white py-2.5 rounded-full font-medium shadow-md shadow-pink-500/20 hover:opacity-95 transition-all cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Interactive Sign In / Sign Up Modal */}
      {authModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              type="button"
              onClick={() => setAuthModal(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                DS
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {authModal === 'signin' ? 'Welcome back' : 'Create an Account'}
              </h3>
            </div>
            <p className="text-sm text-slate-500 mb-5">
              {authModal === 'signin'
                ? 'Sign in to access your saved stacks and collaboration workspace.'
                : 'Join thousands of developers curating and saving custom tech stacks.'}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAuthModal(null);
              }}
              className="space-y-4"
            >
              {authModal === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Developer"
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="dev@example.com"
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-theme-gradient text-white py-2.5 rounded-xl font-semibold shadow-md shadow-pink-500/20 hover:opacity-95 transition-all mt-2 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {authModal === 'signin' ? 'Sign In' : 'Get Started Free'}
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-slate-500">
              {authModal === 'signin' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthModal('signup')}
                    className="text-pink-600 font-semibold hover:underline"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthModal('signin')}
                    className="text-pink-600 font-semibold hover:underline"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
