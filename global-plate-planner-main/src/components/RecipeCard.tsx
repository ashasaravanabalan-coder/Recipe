import { Recipe } from '@/data/recipes';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Clock, Heart, Star, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = { recipe: Recipe };

const RecipeCard = ({ recipe }: Props) => {
  const { language, t } = useLanguage();
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(recipe.id);
  const name = (language !== 'en' && recipe.nameTranslations[language]) || recipe.name;

  return (
    <div className="card-hover group overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <button
          onClick={e => { e.preventDefault(); toggleFavorite(recipe.id); }}
          className={`absolute right-3 top-3 rounded-full p-2 backdrop-blur-sm transition-all ${
            fav ? 'bg-primary text-primary-foreground' : 'bg-card/70 text-muted-foreground hover:bg-card hover:text-primary'
          }`}
        >
          <Heart className={`h-4 w-4 ${fav ? 'fill-current' : ''}`} />
        </button>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="rounded-full bg-primary/90 px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            {recipe.cuisine}
          </span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            recipe.dietType === 'veg' ? 'bg-sage text-sage-foreground' :
            recipe.dietType === 'vegan' ? 'bg-sage text-sage-foreground' :
            'bg-destructive/90 text-destructive-foreground'
          }`}>
            {t(recipe.dietType === 'non-veg' ? 'nonVeg' : recipe.dietType)}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg font-semibold text-card-foreground line-clamp-1">{name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{recipe.category}</p>
        <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {recipe.cookingTime} {t('minutes')}
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5" /> {recipe.calories} {t('calories')}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-golden text-golden" /> {recipe.rating}
          </span>
        </div>
        <Link
          to={`/recipe/${recipe.id}`}
          className="mt-3 block w-full rounded-lg bg-primary/10 py-2 text-center text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          {t('viewRecipe')}
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
