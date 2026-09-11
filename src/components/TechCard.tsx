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
      
    </div>
  );
};
