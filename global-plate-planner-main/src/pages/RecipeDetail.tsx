import { useParams, Link } from 'react-router-dom';
import { recipes, ingredientSubstitutions } from '@/data/recipes';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useMealPlan, days, mealTypes } from '@/contexts/MealPlanContext';
import { ArrowLeft, Clock, Users, Flame, Heart, Star, CalendarPlus, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToMealPlan } = useMealPlan();
  const [showMealPicker, setShowMealPicker] = useState(false);
  const [showSubs, setShowSubs] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakRecipe = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const langMap: Record<string, string> = { en: 'en-US', ta: 'ta-IN', hi: 'hi-IN', ml: 'ml-IN' };
    const ingredients = recipe.ingredients.map(i => `${i.amount} ${i.unit} ${i.name}`).join(', ');
    const steps = recipe.steps.map((s, i) => `Step ${i + 1}: ${s}`).join('. ');
    const text = `${name}. Ingredients: ${ingredients}. Instructions: ${steps}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langMap[language] || 'en-US';
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return <div className="flex min-h-screen items-center justify-center text-foreground">Recipe not found</div>;

  const name = (language !== 'en' && recipe.nameTranslations[language]) || recipe.name;
  const fav = isFavorite(recipe.id);

  const macroData = [
    { name: t('protein'), value: recipe.protein, color: 'hsl(15, 75%, 52%)' },
    { name: t('carbs'), value: recipe.carbs, color: 'hsl(40, 90%, 55%)' },
    { name: t('fat'), value: recipe.fat, color: 'hsl(150, 30%, 45%)' },
  ];

  const subsForRecipe = recipe.ingredients
    .filter(ing => ingredientSubstitutions[ing.name])
    .map(ing => ({ original: ing.name, subs: ingredientSubstitutions[ing.name] }));

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96">
        <img src={recipe.image} alt={name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <div className="absolute left-4 top-4">
          <Link to="/" className="flex items-center gap-2 rounded-lg bg-card/80 px-3 py-2 text-sm font-medium text-foreground backdrop-blur-sm hover:bg-card">
            <ArrowLeft className="h-4 w-4" /> {t('home')}
          </Link>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">{recipe.cuisine}</span>
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${
              recipe.dietType === 'non-veg' ? 'bg-destructive text-destructive-foreground' : 'bg-sage text-sage-foreground'
            }`}>
              {t(recipe.dietType === 'non-veg' ? 'nonVeg' : recipe.dietType)}
            </span>
            {recipe.tags.map(tag => (
              <span key={tag} className="rounded-full bg-golden/90 px-3 py-1 text-sm font-semibold text-golden-foreground">{tag}</span>
            ))}
          </div>
          <h1 className="mt-3 font-heading text-3xl font-bold text-primary-foreground md:text-4xl">{name}</h1>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Clock, label: t('cookingTime'), value: `${recipe.cookingTime} ${t('minutes')}` },
            { icon: Users, label: t('servings'), value: recipe.servings.toString() },
            { icon: Flame, label: t('calories'), value: recipe.calories.toString() },
            { icon: Star, label: t('rating'), value: `${recipe.rating} (${recipe.reviews})` },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
              <stat.icon className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              <p className="mt-0.5 font-heading text-lg font-semibold text-card-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => toggleFavorite(recipe.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              fav ? 'bg-primary text-primary-foreground' : 'border border-border bg-card text-foreground hover:bg-muted'
            }`}
          >
            <Heart className={`h-4 w-4 ${fav ? 'fill-current' : ''}`} />
            {fav ? t('removeFromFavorites') : t('addToFavorites')}
          </button>
          <button
            onClick={() => setShowMealPicker(!showMealPicker)}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            <CalendarPlus className="h-4 w-4" /> {t('addToMealPlan')}
          </button>
          {subsForRecipe.length > 0 && (
            <button
              onClick={() => setShowSubs(!showSubs)}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              <RefreshCw className="h-4 w-4" /> {t('substitutions')}
            </button>
          )}
          <button
            onClick={speakRecipe}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              isSpeaking ? 'bg-destructive text-destructive-foreground' : 'border border-border bg-card text-foreground hover:bg-muted'
            }`}
          >
            {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {isSpeaking ? 'Stop' : '🔊 Listen Recipe'}
          </button>
        </div>

        {/* Meal Picker Dropdown */}
        {showMealPicker && (
          <div className="mt-3 rounded-xl border border-border bg-card p-4">
            <p className="mb-3 text-sm font-medium text-foreground">{t('addToMealPlan')}</p>
            <div className="grid grid-cols-7 gap-2">
              {days.map(day => (
                <div key={day} className="text-center">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">{t(day)}</p>
                  {mealTypes.map(meal => (
                    <button
                      key={meal}
                      onClick={() => { addToMealPlan(recipe.id, day, meal); setShowMealPicker(false); }}
                      className="mb-1 w-full rounded bg-muted px-1 py-1 text-xs text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                    >
                      {t(meal)}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Substitutions */}
        {showSubs && subsForRecipe.length > 0 && (
          <div className="mt-3 rounded-xl border border-border bg-card p-4">
            <h3 className="mb-3 font-heading text-lg font-semibold text-card-foreground">{t('substitutions')}</h3>
            <div className="space-y-2">
              {subsForRecipe.map(s => (
                <div key={s.original} className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">{s.original}</span>
                  <span className="text-muted-foreground">→</span>
                  {s.subs.map(sub => (
                    <span key={sub} className="rounded-full bg-sage/20 px-3 py-1 text-sm font-medium text-secondary-foreground">{sub}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {/* Ingredients */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-heading text-xl font-semibold text-card-foreground">{t('ingredients')}</h2>
            <ul className="mt-4 space-y-3">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{i + 1}</span>
                  <span className="text-card-foreground">{ing.amount} {ing.unit} {ing.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="md:col-span-2">
            <h2 className="font-heading text-xl font-semibold text-foreground">{t('steps')}</h2>
            <div className="mt-4 space-y-4">
              {recipe.steps.map((step, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-card-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nutrition Chart */}
        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold text-card-foreground">{t('nutritionOverview')}</h2>
          <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={macroData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" stroke="none">
                    {macroData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {macroData.map(m => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: m.color }} />
                  <span className="text-sm text-muted-foreground">{m.name}</span>
                  <span className="font-semibold text-card-foreground">{m.value}g</span>
                </div>
              ))}
              <div className="border-t border-border pt-2">
                <span className="text-sm text-muted-foreground">{t('calories')}: </span>
                <span className="font-heading text-lg font-bold text-primary">{recipe.calories} kcal</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetail;
