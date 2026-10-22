import { useLanguage } from '@/contexts/LanguageContext';
import { useMealPlan } from '@/contexts/MealPlanContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { recipes, cuisines } from '@/data/recipes';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChefHat, Globe, CalendarCheck, Flame } from 'lucide-react';

const DashboardPage = () => {
  const { t } = useLanguage();
  const { mealPlan, getTotalNutrition } = useMealPlan();
  const { favorites } = useFavorites();
  const totalNutrition = getTotalNutrition();

  const uniqueCuisines = new Set(mealPlan.map(e => recipes.find(r => r.id === e.recipeId)?.cuisine).filter(Boolean));

  const stats = [
    { icon: ChefHat, label: t('totalRecipes'), value: recipes.length, color: 'bg-primary/10 text-primary' },
    { icon: Globe, label: t('cuisinesExplored'), value: uniqueCuisines.size, color: 'bg-sage/20 text-secondary-foreground' },
    { icon: CalendarCheck, label: t('mealsPlanned'), value: mealPlan.length, color: 'bg-golden/20 text-accent-foreground' },
    { icon: Flame, label: t('caloriesTracked'), value: totalNutrition.calories, color: 'bg-destructive/10 text-destructive' },
  ];

  const macroData = [
    { name: t('protein'), value: totalNutrition.protein, color: 'hsl(15, 75%, 52%)' },
    { name: t('carbs'), value: totalNutrition.carbs, color: 'hsl(40, 90%, 55%)' },
    { name: t('fat'), value: totalNutrition.fat, color: 'hsl(150, 30%, 45%)' },
  ];

  // Cuisine distribution
  const cuisineCount: Record<string, number> = {};
  recipes.forEach(r => { cuisineCount[r.cuisine] = (cuisineCount[r.cuisine] || 0) + 1; });
  const cuisineData = Object.entries(cuisineCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Diet distribution
  const dietCount = { veg: 0, 'non-veg': 0, vegan: 0 };
  recipes.forEach(r => { dietCount[r.dietType]++; });
  const dietData = [
    { name: t('veg'), value: dietCount.veg, color: 'hsl(150, 30%, 45%)' },
    { name: t('nonVeg'), value: dietCount['non-veg'], color: 'hsl(15, 75%, 52%)' },
    { name: t('vegan'), value: dietCount.vegan, color: 'hsl(40, 90%, 55%)' },
  ];

  return (
    <div className="min-h-screen">
      <div className="border-b border-border bg-card px-4 py-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-heading text-2xl font-bold text-foreground">{t('dashboard')}</h1>
          <p className="text-sm text-muted-foreground">{t('nutritionOverview')}</p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map(stat => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
              <div className={`mb-3 inline-flex rounded-lg p-2.5 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="font-heading text-2xl font-bold text-card-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* Cuisine Distribution */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 font-heading text-lg font-semibold text-card-foreground">Recipes by Cuisine</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cuisineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(30, 20%, 88%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(20, 10%, 50%)' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(20, 10%, 50%)' }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(15, 75%, 52%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Diet Distribution */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 font-heading text-lg font-semibold text-card-foreground">Diet Distribution</h2>
            <div className="flex items-center gap-8">
              <div className="h-48 w-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={dietData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" stroke="none">
                      {dietData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {dietData.map(d => (
                  <div key={d.name} className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-sm text-muted-foreground">{d.name}</span>
                    <span className="font-semibold text-card-foreground">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Meal Plan Nutrition */}
          {mealPlan.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-6 md:col-span-2">
              <h2 className="mb-4 font-heading text-lg font-semibold text-card-foreground">{t('macroBreakdown')} — {t('mealPlanner')}</h2>
              <div className="flex flex-wrap items-center gap-8">
                <div className="h-48 w-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={macroData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" stroke="none">
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
                      <span className="font-heading text-lg font-bold text-card-foreground">{m.value}g</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2">
                    <span className="text-sm text-muted-foreground">{t('calories')}: </span>
                    <span className="font-heading text-xl font-bold text-primary">{totalNutrition.calories} kcal</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
