import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-100 mt-24 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-100">
          {/* Brand Info & Socials */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-xs shadow-sm shadow-pink-500/20">
                DS
              </div>
              <div className="flex items-baseline font-bold text-xl tracking-tight">
                <span className="text-slate-900">Dev</span>
                <span className="text-theme-gradient ml-1">Stack</span>
              </div>
            </div>

            <p className="text-sm text-slate-500 max-w-sm leading-relaxed mb-6">
              Curated tools, technologies, and resources for developers building modern software.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-600 transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-600 transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>Twitter</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-600 transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Links Column: Product */}
          <div className="md:col-span-2 sm:col-span-4 text-left">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li>
                <a href="#home" className="hover:text-pink-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#technologies" className="hover:text-pink-600 transition-colors">
                  Technologies
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-pink-600 transition-colors">
                  Projects
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column: Company */}
          <div className="md:col-span-3 sm:col-span-4 text-left">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li>
                <a href="#about" className="hover:text-pink-600 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-pink-600 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-pink-600 transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column: Legal */}
          <div className="md:col-span-2 sm:col-span-4 text-left">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li>
                <a href="#privacy" className="hover:text-pink-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-pink-600 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Dev Stack. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-600 transition-colors">
              Privacy
            </a>
            <a href="#terms" className="hover:text-slate-600 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
