import { recipes } from '@/data/recipes';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import RecipeCard from '@/components/RecipeCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { t } = useLanguage();
  const { favorites } = useFavorites();

  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));

  return (
    <div className="min-h-screen">
      <div className="border-b border-border bg-card px-4 py-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-heading text-2xl font-bold text-foreground">{t('favorites')}</h1>
          <p className="text-sm text-muted-foreground">{favoriteRecipes.length} {t('recipes')}</p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {favoriteRecipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart className="mb-4 h-16 w-16 text-muted-foreground/30" />
            <h3 className="font-heading text-xl font-semibold text-foreground">No favorites yet</h3>
            <p className="mt-2 text-muted-foreground">Browse recipes and tap the heart to save them here</p>
            <Link to="/" className="mt-4 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
              {t('recipes')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;
