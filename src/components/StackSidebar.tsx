import React from 'react';
import type { Technology } from '../types';
import { X, Layers, Trash2, Copy, CheckCheck } from 'lucide-react';
import { toast } from 'react-toastify';


interface StackSidebarProps {
  stack: Technology[];
  onRemove: (tech: Technology) => void;
  onRemoveAll: () => void;
}

export const StackSidebar: React.FC<StackSidebarProps> = ({
  stack,
  onRemove,
  onRemoveAll,
}) => {
  const [copied, setCopied] = React.useState(false);

  const countText =
    stack.length === 1
      ? '1 Technology Selected'
      : `${stack.length} Technology Selected`;

  const handleCopyStack = () => {
    if (stack.length === 0) return;
    const summary = stack
      .map((item) => `- ${item.name} (${item.category}): ${item.description}`)
      .join('\n');
    const textToCopy = `My Dev Stack:\n${summary}\n\nBuilt with DevStack Builder`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success('📋 Stack summary copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside
      id="your-stack-sidebar"
      className="bg-white rounded-2xl border border-slate-100/90 shadow-sm p-5 sm:p-6 lg:sticky lg:top-28 flex flex-col justify-between max-h-[calc(100vh-140px)] overflow-hidden"
    >
      <div>
        {/* Header with Title and Counter */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Your Stack</span>
              {stack.length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-pink-700 bg-pink-100 rounded-full">
                  {stack.length}
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">{countText}</p>
          </div>

          {stack.length > 0 && (
            <button
              type="button"
              onClick={handleCopyStack}
              title="Copy stack list"
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? (
                <CheckCheck className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Selected Stack Items List or Empty State */}
        <div className="overflow-y-auto max-h-[420px] pr-1 space-y-2.5">
          {stack.length === 0 ? (
            <div className="py-12 px-4 text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 mb-3">
                <Layers className="w-7 h-7" />
              </div>
              <p className="text-sm font-medium text-slate-700 mb-1">
                No technologies selected
              </p>
              <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed">
                Click <span className="font-semibold text-slate-600">"Add to Stack"</span> on any card to assemble your ideal workflow.
              </p>
            </div>
          ) : (
            stack.map((item) => (
              <div
                key={item.id}
                className="group flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 shrink-0">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="truncate">
                    <h4 className="text-sm font-semibold text-slate-800 truncate">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {item.category}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  id={`remove-item-${item.id}`}
                  onClick={() => onRemove(item)}
                  title={`Remove ${item.name}`}
                  className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                  aria-label={`Remove ${item.name} from stack`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Action: Remove All & Stack stats */}
      {stack.length > 0 && (
        <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
          <button
            type="button"
            id="remove-all-btn"
            onClick={onRemoveAll}
            className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-rose-500 border border-rose-200 hover:bg-rose-50 hover:border-rose-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Remove All</span>
          </button>
        </div>
      )}
    </aside>
  );
};
