import { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechCard } from './components/TechCard';
import { StackSidebar } from './components/StackSidebar';
import { Footer } from './components/Footer';
import type { Technology, Category } from './types';
import { ToastContainer, toast } from 'react-toastify';
import { Loader2, Sparkles, FolderGit2, RotateCw, Layers, ArrowRight } from 'lucide-react';

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

  const loadData = async (delay = 400) => {
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
    loadData(0);
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

  // Apply preset stack blueprint
  const handleApplyPreset = (presetName: string, techIds: string[]) => {
    const presetItems = technologies.filter((t) => techIds.includes(t.id));
    if (presetItems.length === 0) return;

    let addedCount = 0;
    setSelectedStack((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const newItems = presetItems.filter((item) => !existingIds.has(item.id));
      addedCount = newItems.length;
      return [...prev, ...newItems];
    });

    if (addedCount > 0) {
      toast.success(`🚀 Loaded ${addedCount} technologies from "${presetName}"!`, {
        position: 'top-right',
        autoClose: 2500,
      });
    } else {
      toast.info(`All technologies from "${presetName}" are already in your stack.`, {
        position: 'top-right',
        autoClose: 2500,
      });
    }
  };

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
          onLearnMoreClick={() => scrollToSection('projects')}
        />

        
      </main>

      
    </div>
  );
}

export default App;
