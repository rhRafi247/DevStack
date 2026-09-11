import React from 'react';
import bannerStackImg from '../assets/banner-stack.png';
import { ArrowRight } from 'lucide-react';


interface HeroProps {
  onExploreClick: () => void;
  onLearnMoreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onLearnMoreClick }) => {
  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-14 md:pb-20 overflow-hidden">
      {/* Background subtle ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-orange-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 right-10 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
              Build Your Ideal <br className="hidden sm:block" />
              <span className="text-theme-gradient">Development Stack</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              Explore frontend, backend, database, and tooling options, compare them side by side, and put together the stack that fits your next project.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                id="explore-technologies-btn"
                onClick={onExploreClick}
                className="w-full sm:w-auto bg-theme-gradient text-white px-7 py-3.5 rounded-full font-semibold text-base shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Explore Technologies</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                id="learn-more-btn"
                onClick={() => {
                  if (onLearnMoreClick) {
                    onLearnMoreClick();
                  } else {
                    const el = document.getElementById('about');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto border border-slate-200 bg-white/80 hover:bg-slate-50 hover:border-slate-300 text-slate-700 px-7 py-3.5 rounded-full font-semibold text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Learn More</span>
              </button>
            </div>
          </div>

          {/* Right Banner Image Column */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              {/* Soft circular background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-purple-500/10 to-blue-500/10 rounded-full blur-2xl transform scale-90 pointer-events-none" />
              
              <img
                src={bannerStackImg}
                alt="Development Tech Stack Layers"
                className="w-full h-auto object-contain drop-shadow-2xl animate-float select-none relative z-10"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
