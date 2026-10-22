import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Recipe, recipes } from '@/data/recipes';

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type MealPlanEntry = {
  recipeId: string;
  mealType: MealType;
  day: DayOfWeek;
};

type MealPlanContextType = {
  mealPlan: MealPlanEntry[];
  addToMealPlan: (recipeId: string, day: DayOfWeek, mealType: MealType) => void;
  removeFromMealPlan: (recipeId: string, day: DayOfWeek, mealType: MealType) => void;
  clearMealPlan: () => void;
  getRecipesForSlot: (day: DayOfWeek, mealType: MealType) => Recipe[];
  generateGroceryList: () => { name: string; amount: string; unit: string }[];
  getTotalNutrition: () => { calories: number; protein: number; carbs: number; fat: number };
};

const MealPlanContext = createContext<MealPlanContextType | undefined>(undefined);

export const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
export const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

export const MealPlanProvider = ({ children }: { children: ReactNode }) => {
  const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>(() => {
    const saved = localStorage.getItem('meal-plan');
    return saved ? JSON.parse(saved) : [];
  });

  const save = (plan: MealPlanEntry[]) => {
    localStorage.setItem('meal-plan', JSON.stringify(plan));
    setMealPlan(plan);
  };

  const addToMealPlan = (recipeId: string, day: DayOfWeek, mealType: MealType) => {
    const exists = mealPlan.find(e => e.recipeId === recipeId && e.day === day && e.mealType === mealType);
    if (!exists) save([...mealPlan, { recipeId, day, mealType }]);
  };

  const removeFromMealPlan = (recipeId: string, day: DayOfWeek, mealType: MealType) => {
    save(mealPlan.filter(e => !(e.recipeId === recipeId && e.day === day && e.mealType === mealType)));
  };

  const clearMealPlan = () => save([]);

  const getRecipesForSlot = (day: DayOfWeek, mealType: MealType): Recipe[] => {
    return mealPlan
      .filter(e => e.day === day && e.mealType === mealType)
      .map(e => recipes.find(r => r.id === e.recipeId))
      .filter(Boolean) as Recipe[];
  };

  const generateGroceryList = () => {
    const ingredientMap: Record<string, { amount: number; unit: string }> = {};
    mealPlan.forEach(entry => {
      const recipe = recipes.find(r => r.id === entry.recipeId);
      if (!recipe) return;
      recipe.ingredients.forEach(ing => {
        const key = ing.name.toLowerCase();
        if (ingredientMap[key]) {
          ingredientMap[key].amount += parseFloat(ing.amount) || 0;
        } else {
          ingredientMap[key] = { amount: parseFloat(ing.amount) || 0, unit: ing.unit };
        }
      });
    });
    return Object.entries(ingredientMap).map(([name, { amount, unit }]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      amount: amount.toString(),
      unit,
    }));
  };

  const getTotalNutrition = () => {
    return mealPlan.reduce(
      (acc, entry) => {
        const recipe = recipes.find(r => r.id === entry.recipeId);
        if (!recipe) return acc;
        return {
          calories: acc.calories + recipe.calories,
          protein: acc.protein + recipe.protein,
          carbs: acc.carbs + recipe.carbs,
          fat: acc.fat + recipe.fat,
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  return (
    <MealPlanContext.Provider value={{ mealPlan, addToMealPlan, removeFromMealPlan, clearMealPlan, getRecipesForSlot, generateGroceryList, getTotalNutrition }}>
      {children}
    </MealPlanContext.Provider>
  );
};

export const useMealPlan = () => {
  const context = useContext(MealPlanContext);
  if (!context) throw new Error('useMealPlan must be used within MealPlanProvider');
  return context;
};
