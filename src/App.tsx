import { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechCard } from './components/TechCard';
import { StackSidebar } from './components/StackSidebar';
import { Footer } from './components/Footer';
import type { Technology, Category } from './types';
import { ToastContainer, toast } from 'react-toastify';
import { Sparkles, Layers } from 'lucide-react';

const CATEGORIES: Category[] = [
  'All',
  'Frontend',
  'Backend',
  'Database',
  'Language',
  'Styling',
  'DevOps',
];

export function App() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [selectedStack, setSelectedStack] = useState<Technology[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const loadData = async (delay = 500) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/data/technologies.json');
      if (!response.ok) {
        throw new Error(`Failed to load data (${response.status} ${response.statusText})`);
      }
      const data: Technology[] = await response.json();
      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      setTechnologies(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Could not fetch technologies. Please check your network connection.');
      toast.error('Failed to load technologies dataset.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(500);
  }, []);

  // Check if a technology is already in the stack
  const isTechnologyAdded = (id: string) => {
    return selectedStack.some((item) => item.id === id);
  };

  // Add technology to stack
  const handleAddToStack = (tech: Technology) => {
    if (isTechnologyAdded(tech.id)) {
      toast.warning(`⚠️ ${tech.name} is already in your stack!`, {
        position: 'top-right',
        autoClose: 2500,
      });
      return;
    }

    setSelectedStack((prev) => [...prev, tech]);
    toast.success(`🎉 Added ${tech.name} to your stack!`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  // Remove single technology from stack
  const handleRemoveFromStack = (tech: Technology) => {
    setSelectedStack((prev) => prev.filter((item) => item.id !== tech.id));
    toast.info(`🗑️ Removed ${tech.name} from your stack.`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  // Remove all technologies from stack
  const handleRemoveAll = () => {
    if (selectedStack.length === 0) return;
    const count = selectedStack.length;
    setSelectedStack([]);
    toast.info(`🧹 Cleared all ${count} technologies from your stack.`, {
      position: 'top-right',
      autoClose: 2500,
    });
  };

  // Filtered technology list based on category
  const filteredTechnologies = useMemo(() => {
    if (activeCategory === 'All') return technologies;
    return technologies.filter(
      (tech) => tech.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [technologies, activeCategory]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const footer = document.querySelector('footer');
      if (footer) footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-pink-100 selection:text-pink-600">
      {/* Toast Notification Container */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Sticky Navbar */}
      <Navbar onNavigate={scrollToSection} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('technologies')}
          onLearnMoreClick={() => scrollToSection('technologies')}
        />

        {/* Technologies Explorer Section */}
        <section id="technologies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 scroll-mt-24">
          {/* Section Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pink-50 text-pink-600 border border-pink-100 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore & Build Your Stack
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl">
              Browse our curated catalogue of battle-tested development technologies. Filter by category, compare specifications, and assemble your stack in real-time.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              const count =
                category === 'All'
                  ? technologies.length
                  : technologies.filter(
                      (tech) => tech.category.toLowerCase() === category.toLowerCase()
                    ).length;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-theme-gradient text-white shadow-md shadow-pink-500/25 scale-102'
                      : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-600'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Main Content Layout: Tech Cards Grid + Stack Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left/Main Column: Cards Grid */}
            <div className="lg:col-span-8 xl:col-span-8">
              {loading ? (
                <div className="py-24 text-center">
                  <p className="text-xl font-semibold text-slate-700">Loading..</p>
                </div>
              ) : error ? (
                <div className="bg-rose-50 border border-rose-200 rounded-3xl p-12 text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-3 font-bold text-lg">
                    !
                  </div>
                  <h3 className="text-base font-bold text-rose-800 mb-1">
                    Failed to Load Technologies
                  </h3>
                  <p className="text-xs text-rose-600 mb-4 max-w-md">{error}</p>
                  <button
                    type="button"
                    onClick={() => loadData(500)}
                    className="px-5 py-2.5 bg-rose-600 text-white text-xs font-semibold rounded-xl hover:bg-rose-700 transition-colors shadow-sm cursor-pointer"
                  >
                    Try Again
                  </button>
                </div>
              ) : filteredTechnologies.length === 0 ? (
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-16 text-center flex flex-col items-center justify-center">
                  <Layers className="w-10 h-10 text-slate-300 mb-3" />
                  <h3 className="text-base font-semibold text-slate-700">
                    No technologies found
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Try switching categories to view available technologies.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredTechnologies.map((tech) => (
                    <TechCard
                      key={tech.id}
                      technology={tech}
                      isAdded={isTechnologyAdded(tech.id)}
                      onAdd={handleAddToStack}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Stack Sidebar */}
            <div className="lg:col-span-4 xl:col-span-4">
              <StackSidebar
                stack={selectedStack}
                onRemove={handleRemoveFromStack}
                onRemoveAll={handleRemoveAll}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      
    </div>
  );
}

export default App;
