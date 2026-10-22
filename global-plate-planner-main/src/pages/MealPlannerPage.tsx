import { useLanguage } from '@/contexts/LanguageContext';
import { useMealPlan, days, mealTypes } from '@/contexts/MealPlanContext';
import { X, ShoppingCart, Trash2, CalendarDays } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MealPlannerPage = () => {
  const { t } = useLanguage();
  const { getRecipesForSlot, removeFromMealPlan, clearMealPlan, generateGroceryList, mealPlan } = useMealPlan();
  const [showGrocery, setShowGrocery] = useState(false);
  const groceryList = generateGroceryList();

  return (
    <div className="min-h-screen">
      <div className="border-b border-border bg-card px-4 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">{t('mealPlanner')}</h1>
            <p className="text-sm text-muted-foreground">{mealPlan.length} {t('mealsPlanned')}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowGrocery(!showGrocery)}
              className="flex items-center gap-2 rounded-lg bg-sage px-4 py-2 text-sm font-medium text-sage-foreground hover:opacity-90"
            >
              <ShoppingCart className="h-4 w-4" /> {t('groceryList')}
            </button>
            <button
              onClick={clearMealPlan}
              className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/20"
            >
              <Trash2 className="h-4 w-4" /> {t('clearMealPlan')}
            </button>
          </div>
        </div>
      </div>

      {/* Grocery List */}
      {showGrocery && (
        <div className="border-b border-border bg-warm px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">{t('groceryList')}</h2>
            {groceryList.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t('mealPlanEmpty')}</p>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {groceryList.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
                    <input type="checkbox" className="accent-primary" />
                    <span className="text-card-foreground">{item.name}</span>
                    <span className="ml-auto text-muted-foreground">{item.amount} {item.unit}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Calendar Grid */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        {mealPlan.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <CalendarDays className="mb-4 h-16 w-16 text-muted-foreground/30" />
            <h3 className="font-heading text-xl font-semibold text-foreground">{t('mealPlanEmpty')}</h3>
            <p className="mt-2 text-muted-foreground">{t('addRecipesToPlan')}</p>
            <Link to="/" className="mt-4 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
              {t('recipes')}
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr>
                  <th className="border border-border bg-muted p-3 text-left text-sm font-medium text-muted-foreground" />
                  {days.map(day => (
                    <th key={day} className="border border-border bg-muted p-3 text-center text-sm font-medium text-muted-foreground">
                      {t(day)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mealTypes.map(meal => (
                  <tr key={meal}>
                    <td className="border border-border bg-muted p-3 text-sm font-medium text-muted-foreground">{t(meal)}</td>
                    {days.map(day => {
                      const dayRecipes = getRecipesForSlot(day, meal);
                      return (
                        <td key={day} className="border border-border p-2 align-top">
                          {dayRecipes.map(recipe => (
                            <div key={recipe.id} className="mb-1 flex items-center gap-1 rounded-lg bg-primary/10 p-2">
                              <img src={recipe.image} alt="" className="h-8 w-8 rounded object-cover" />
                              <Link to={`/recipe/${recipe.id}`} className="flex-1 text-xs font-medium text-primary hover:underline line-clamp-1">
                                {recipe.name}
                              </Link>
                              <button
                                onClick={() => removeFromMealPlan(recipe.id, day, meal)}
                                className="shrink-0 text-muted-foreground hover:text-destructive"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default MealPlannerPage;
