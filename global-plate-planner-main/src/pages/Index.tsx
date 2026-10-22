import { useState, useMemo } from 'react';
import { recipes } from '@/data/recipes';
import { useLanguage } from '@/contexts/LanguageContext';
import RecipeCard from '@/components/RecipeCard';
import SearchFilters from '@/components/SearchFilters';
import ChatBot from '@/components/ChatBot';
import { ChefHat, Sparkles, MessageCircle, X } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  const [filters, setFilters] = useState({
    search: '',
    cuisine: '',
    dietType: '',
    category: '',
    maxTime: 180,
    maxCalories: 800,
  });
  const [chatOpen, setChatOpen] = useState(false);

  const filtered = useMemo(() => {
    return recipes.filter(r => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchesName = r.name.toLowerCase().includes(q);
        const matchesIngredient = r.ingredients.some(i => i.name.toLowerCase().includes(q));
        const matchesCuisine = r.cuisine.toLowerCase().includes(q);
        if (!matchesName && !matchesIngredient && !matchesCuisine) return false;
      }
      if (filters.cuisine && r.cuisine !== filters.cuisine) return false;
      if (filters.dietType && r.dietType !== filters.dietType) return false;
      if (filters.category && r.category !== filters.category) return false;
      if (r.cookingTime > filters.maxTime) return false;
      if (r.calories > filters.maxCalories) return false;
      return true;
    });
  }, [filters]);

  const popularCuisines = ['Indian', 'Chinese', 'Italian', 'Japanese', 'Mexican', 'Thai', 'Korean', 'Arabic'];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero px-4 py-16 text-center md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-card/20 px-4 py-2 text-sm font-medium text-primary-foreground backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            40+ {t('recipes')} from around the world
          </div>
          <h1 className="font-heading text-4xl font-bold text-primary-foreground md:text-6xl">
            {t('appName')}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Discover global recipes, plan your meals, and track nutrition — all in one place.
          </p>
        </div>
      </section>

      {/* Cuisine Quick Filter */}
      <section className="border-b border-border bg-card px-4 py-4">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setFilters(f => ({ ...f, cuisine: '' }))}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              !filters.cuisine ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            All
          </button>
          {popularCuisines.map(c => (
            <button
              key={c}
              onClick={() => setFilters(f => ({ ...f, cuisine: f.cuisine === c ? '' : c }))}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filters.cuisine === c ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content with Chat Panel */}
      <div className="mx-auto max-w-[1600px] px-4 py-8">
        <div className={`flex gap-6 ${chatOpen ? '' : ''}`}>
          {/* Left: Recipes */}
          <main className={`min-w-0 ${chatOpen ? 'flex-1' : 'w-full'}`}>
            <SearchFilters filters={filters} onChange={setFilters} />

            <div className="mt-4 text-sm text-muted-foreground">
              {filtered.length} {t('recipes')}
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <ChefHat className="mb-4 h-16 w-16 text-muted-foreground/30" />
                <h3 className="font-heading text-xl font-semibold text-foreground">{t('noRecipesFound')}</h3>
                <p className="mt-2 text-muted-foreground">{t('clearFilters')}</p>
              </div>
            ) : (
              <div className={`mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 ${chatOpen ? 'lg:grid-cols-2 xl:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'}`}>
                {filtered.map((recipe, i) => (
                  <div key={recipe.id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                    <RecipeCard recipe={recipe} />
                  </div>
                ))}
              </div>
            )}
          </main>

          {/* Right: Chat Panel (desktop) */}
          {chatOpen && (
            <aside className="hidden w-[400px] shrink-0 lg:block">
              <div className="sticky top-20 h-[calc(100vh-6rem)]">
                <ChatBot />
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Mobile Chat Overlay */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden">
          <div className="absolute bottom-0 left-0 right-0 top-16 flex flex-col">
            <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
              <span className="text-sm font-semibold text-card-foreground">Chef AI Chat</span>
              <button onClick={() => setChatOpen(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1">
              <ChatBot />
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Toggle Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl"
      >
        {chatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default Index;
