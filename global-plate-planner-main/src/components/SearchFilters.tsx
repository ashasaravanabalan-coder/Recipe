import { useLanguage } from '@/contexts/LanguageContext';
import { cuisines, categories, dietTypes } from '@/data/recipes';
import { Search, SlidersHorizontal, X } from 'lucide-react';

type Filters = {
  search: string;
  cuisine: string;
  dietType: string;
  category: string;
  maxTime: number;
  maxCalories: number;
};

type Props = {
  filters: Filters;
  onChange: (filters: Filters) => void;
};

const SearchFilters = ({ filters, onChange }: Props) => {
  const { t } = useLanguage();

  const update = (key: keyof Filters, value: Filters[keyof Filters]) => onChange({ ...filters, [key]: value });
  const hasFilters = filters.cuisine || filters.dietType || filters.category || filters.maxTime < 180 || filters.maxCalories < 800;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={filters.search}
          onChange={e => update('search', e.target.value)}
          className="w-full rounded-xl border border-border bg-card py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-3">
        <select
          value={filters.cuisine}
          onChange={e => update('cuisine', e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
        >
          <option value="">{t('allCuisines')}</option>
          {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={filters.dietType}
          onChange={e => update('dietType', e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
        >
          <option value="">{t('allDiets')}</option>
          {dietTypes.map(d => (
            <option key={d} value={d}>{t(d === 'non-veg' ? 'nonVeg' : d)}</option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={e => update('category', e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
        >
          <option value="">{t('allCategories')}</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
          <span className="text-muted-foreground">{t('maxCookingTime')}:</span>
          <input
            type="range"
            min={5}
            max={180}
            value={filters.maxTime}
            onChange={e => update('maxTime', Number(e.target.value))}
            className="w-24 accent-primary"
          />
          <span className="font-medium text-foreground">{filters.maxTime} {t('minutes')}</span>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
          <span className="text-muted-foreground">{t('calories')}:</span>
          <input
            type="range"
            min={100}
            max={800}
            step={50}
            value={filters.maxCalories}
            onChange={e => update('maxCalories', Number(e.target.value))}
            className="w-24 accent-primary"
          />
          <span className="font-medium text-foreground">≤{filters.maxCalories}</span>
        </div>

        {hasFilters && (
          <button
            onClick={() => onChange({ search: filters.search, cuisine: '', dietType: '', category: '', maxTime: 180, maxCalories: 800 })}
            className="flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/20"
          >
            <X className="h-3.5 w-3.5" /> {t('clearFilters')}
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
