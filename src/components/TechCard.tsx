import React from 'react';
import type { Technology } from '../types';
import { Star, Check } from 'lucide-react';


interface TechCardProps {
  technology: Technology;
  isAdded: boolean;
  onAdd: (tech: Technology) => void;
}

export const TechCard: React.FC<TechCardProps> = ({ technology, isAdded, onAdd }) => {
  const { name, category, description, icon, rating, difficulty, badge, badgeColor } = technology;

  // Map badgeColor to clean pastel Tailwind classes
  const getBadgeStyle = (color?: string) => {
    switch (color) {
      case 'sky':
      case 'blue':
        return 'bg-sky-50 text-sky-600 border-sky-100';
      case 'emerald':
      case 'green':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'orange':
        return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'rose':
      case 'pink':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'amber':
      case 'yellow':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'teal':
        return 'bg-teal-50 text-teal-600 border-teal-100';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl border p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
        isAdded
          ? 'border-pink-200 ring-1 ring-pink-100 shadow-xs'
          : 'border-slate-100 hover:border-slate-200 shadow-xs'
      }`}
    >
      {/* Top Row: Icon & Badge */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100/80 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
          <img
            src={icon}
            alt={`${name} icon`}
            className="w-full h-full object-contain"
            loading="lazy"
            onError={(e) => {
              // Graceful fallback if image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {badge && (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getBadgeStyle(
              badgeColor
            )}`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Title & Description */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1.5 group-hover:text-pink-600 transition-colors">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2 h-[38px]">
          {description}
        </p>
      </div>

      {/* Metadata Row: Category Chip, Difficulty, Rating */}
      <div className="pt-3 border-t border-slate-50 mb-4 flex items-center justify-between gap-2 text-xs">
        <span className="bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">
          {category}
        </span>

        <span className="text-slate-400 font-normal">
          {difficulty}
        </span>

        <div className="flex items-center gap-1 font-semibold text-slate-700">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        id={`add-btn-${technology.id}`}
        onClick={() => onAdd(technology)}
        aria-label={isAdded ? `${name} is added to stack` : `Add ${name} to stack`}
        className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
          isAdded
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none'
            : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] shadow-sm hover:shadow'
        }`}
      >
        {isAdded ? (
          <>
            <Check className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
            <span>✓ Added to Stack</span>
          </>
        ) : (
          <span>Add to Stack</span>
        )}
      </button>
    </div>
  );
};
