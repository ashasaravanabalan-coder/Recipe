export type Language = 'en' | 'ta' | 'hi' | 'ml';

export const languageNames: Record<Language, string> = {
  en: 'English',
  ta: 'தமிழ்',
  hi: 'हिन्दी',
  ml: 'മലയാളം',
};

type TranslationKeys = {
  appName: string;
  home: string;
  recipes: string;
  mealPlanner: string;
  favorites: string;
  dashboard: string;
  search: string;
  searchPlaceholder: string;
  allCuisines: string;
  allDiets: string;
  allCategories: string;
  cookingTime: string;
  minutes: string;
  servings: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  ingredients: string;
  steps: string;
  noRecipesFound: string;
  viewRecipe: string;
  addToFavorites: string;
  removeFromFavorites: string;
  addToMealPlan: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snack: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  groceryList: string;
  generateGroceryList: string;
  clearMealPlan: string;
  nutritionOverview: string;
  weeklyCalories: string;
  macroBreakdown: string;
  dailyAverage: string;
  totalRecipes: string;
  cuisinesExplored: string;
  mealsPlanned: string;
  caloriesTracked: string;
  veg: string;
  nonVeg: string;
  vegan: string;
  filterByCuisine: string;
  filterByDiet: string;
  filterByCategory: string;
  maxCookingTime: string;
  calorieRange: string;
  clearFilters: string;
  rating: string;
  reviews: string;
  substituteIngredient: string;
  substitutions: string;
  selectLanguage: string;
  step: string;
  of: string;
  remove: string;
  mealPlanEmpty: string;
  addRecipesToPlan: string;
};

export const translations: Record<Language, TranslationKeys> = {
  en: {
    appName: 'Smart Recipe Planner',
    home: 'Home',
    recipes: 'Recipes',
    mealPlanner: 'Meal Planner',
    favorites: 'Favorites',
    dashboard: 'Dashboard',
    search: 'Search',
    searchPlaceholder: 'Search recipes, ingredients...',
    allCuisines: 'All Cuisines',
    allDiets: 'All Diets',
    allCategories: 'All Categories',
    cookingTime: 'Cooking Time',
    minutes: 'min',
    servings: 'Servings',
    calories: 'Calories',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    ingredients: 'Ingredients',
    steps: 'Steps',
    noRecipesFound: 'No recipes found',
    viewRecipe: 'View Recipe',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    addToMealPlan: 'Add to Meal Plan',
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snack: 'Snack',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    groceryList: 'Grocery List',
    generateGroceryList: 'Generate Grocery List',
    clearMealPlan: 'Clear Meal Plan',
    nutritionOverview: 'Nutrition Overview',
    weeklyCalories: 'Weekly Calories',
    macroBreakdown: 'Macro Breakdown',
    dailyAverage: 'Daily Average',
    totalRecipes: 'Total Recipes',
    cuisinesExplored: 'Cuisines Explored',
    mealsPlanned: 'Meals Planned',
    caloriesTracked: 'Calories Tracked',
    veg: 'Vegetarian',
    nonVeg: 'Non-Veg',
    vegan: 'Vegan',
    filterByCuisine: 'Filter by Cuisine',
    filterByDiet: 'Filter by Diet',
    filterByCategory: 'Filter by Category',
    maxCookingTime: 'Max Cooking Time',
    calorieRange: 'Calorie Range',
    clearFilters: 'Clear Filters',
    rating: 'Rating',
    reviews: 'reviews',
    substituteIngredient: 'Substitute Ingredient',
    substitutions: 'Substitutions',
    selectLanguage: 'Language',
    step: 'Step',
    of: 'of',
    remove: 'Remove',
    mealPlanEmpty: 'Your meal plan is empty',
    addRecipesToPlan: 'Browse recipes and add them to your meal plan',
  },
  ta: {
    appName: 'ஸ்மார்ட் ரெசிபி பிளானர்',
    home: 'முகப்பு',
    recipes: 'சமையல் குறிப்புகள்',
    mealPlanner: 'உணவு திட்டமிடல்',
    favorites: 'பிடித்தவை',
    dashboard: 'டாஷ்போர்ட்',
    search: 'தேடு',
    searchPlaceholder: 'சமையல் குறிப்புகள், பொருட்கள் தேடுங்கள்...',
    allCuisines: 'அனைத்து உணவு வகைகள்',
    allDiets: 'அனைத்து உணவு முறைகள்',
    allCategories: 'அனைத்து வகைகள்',
    cookingTime: 'சமையல் நேரம்',
    minutes: 'நிமிடங்கள்',
    servings: 'பரிமாறல்',
    calories: 'கலோரிகள்',
    protein: 'புரதம்',
    carbs: 'கார்ப்ஸ்',
    fat: 'கொழுப்பு',
    ingredients: 'பொருட்கள்',
    steps: 'படிகள்',
    noRecipesFound: 'சமையல் குறிப்புகள் இல்லை',
    viewRecipe: 'சமையல் குறிப்பு காண',
    addToFavorites: 'பிடித்தவையில் சேர்',
    removeFromFavorites: 'பிடித்தவையிலிருந்து நீக்கு',
    addToMealPlan: 'உணவு திட்டத்தில் சேர்',
    breakfast: 'காலை உணவு',
    lunch: 'மதிய உணவு',
    dinner: 'இரவு உணவு',
    snack: 'சிற்றுண்டி',
    monday: 'திங்கள்',
    tuesday: 'செவ்வாய்',
    wednesday: 'புதன்',
    thursday: 'வியாழன்',
    friday: 'வெள்ளி',
    saturday: 'சனி',
    sunday: 'ஞாயிறு',
    groceryList: 'மளிகை பட்டியல்',
    generateGroceryList: 'மளிகை பட்டியல் உருவாக்கு',
    clearMealPlan: 'உணவு திட்டம் அழி',
    nutritionOverview: 'ஊட்டச்சத்து மேலோட்டம்',
    weeklyCalories: 'வாராந்திர கலோரிகள்',
    macroBreakdown: 'மேக்ரோ விவரம்',
    dailyAverage: 'தினசரி சராசரி',
    totalRecipes: 'மொத்த குறிப்புகள்',
    cuisinesExplored: 'ஆராய்ந்த உணவு வகைகள்',
    mealsPlanned: 'திட்டமிட்ட உணவுகள்',
    caloriesTracked: 'கண்காணித்த கலோரிகள்',
    veg: 'சைவம்',
    nonVeg: 'அசைவம்',
    vegan: 'வீகன்',
    filterByCuisine: 'உணவு வகையால் வடிகட்டு',
    filterByDiet: 'உணவு முறையால் வடிகட்டு',
    filterByCategory: 'வகையால் வடிகட்டு',
    maxCookingTime: 'அதிகபட்ச சமையல் நேரம்',
    calorieRange: 'கலோரி வரம்பு',
    clearFilters: 'வடிப்பான்களை அழி',
    rating: 'மதிப்பீடு',
    reviews: 'மதிப்புரைகள்',
    substituteIngredient: 'மாற்று பொருள்',
    substitutions: 'மாற்றுகள்',
    selectLanguage: 'மொழி',
    step: 'படி',
    of: 'இல்',
    remove: 'நீக்கு',
    mealPlanEmpty: 'உணவு திட்டம் காலியாக உள்ளது',
    addRecipesToPlan: 'சமையல் குறிப்புகளை உணவு திட்டத்தில் சேர்க்கவும்',
  },
  hi: {
    appName: 'स्मार्ट रेसिपी प्लानर',
    home: 'होम',
    recipes: 'रेसिपी',
    mealPlanner: 'मील प्लानर',
    favorites: 'पसंदीदा',
    dashboard: 'डैशबोर्ड',
    search: 'खोजें',
    searchPlaceholder: 'रेसिपी, सामग्री खोजें...',
    allCuisines: 'सभी व्यंजन',
    allDiets: 'सभी आहार',
    allCategories: 'सभी श्रेणियां',
    cookingTime: 'खाना पकाने का समय',
    minutes: 'मिनट',
    servings: 'सर्विंग्स',
    calories: 'कैलोरी',
    protein: 'प्रोटीन',
    carbs: 'कार्ब्स',
    fat: 'फैट',
    ingredients: 'सामग्री',
    steps: 'चरण',
    noRecipesFound: 'कोई रेसिपी नहीं मिली',
    viewRecipe: 'रेसिपी देखें',
    addToFavorites: 'पसंदीदा में जोड़ें',
    removeFromFavorites: 'पसंदीदा से हटाएं',
    addToMealPlan: 'मील प्लान में जोड़ें',
    breakfast: 'नाश्ता',
    lunch: 'दोपहर का भोजन',
    dinner: 'रात का भोजन',
    snack: 'स्नैक',
    monday: 'सोमवार',
    tuesday: 'मंगलवार',
    wednesday: 'बुधवार',
    thursday: 'गुरुवार',
    friday: 'शुक्रवार',
    saturday: 'शनिवार',
    sunday: 'रविवार',
    groceryList: 'किराने की सूची',
    generateGroceryList: 'किराने की सूची बनाएं',
    clearMealPlan: 'मील प्लान साफ करें',
    nutritionOverview: 'पोषण अवलोकन',
    weeklyCalories: 'साप्ताहिक कैलोरी',
    macroBreakdown: 'मैक्रो ब्रेकडाउन',
    dailyAverage: 'दैनिक औसत',
    totalRecipes: 'कुल रेसिपी',
    cuisinesExplored: 'खोजे गए व्यंजन',
    mealsPlanned: 'नियोजित भोजन',
    caloriesTracked: 'ट्रैक की गई कैलोरी',
    veg: 'शाकाहारी',
    nonVeg: 'मांसाहारी',
    vegan: 'वीगन',
    filterByCuisine: 'व्यंजन द्वारा फ़िल्टर',
    filterByDiet: 'आहार द्वारा फ़िल्टर',
    filterByCategory: 'श्रेणी द्वारा फ़िल्टर',
    maxCookingTime: 'अधिकतम खाना पकाने का समय',
    calorieRange: 'कैलोरी रेंज',
    clearFilters: 'फ़िल्टर साफ करें',
    rating: 'रेटिंग',
    reviews: 'समीक्षाएं',
    substituteIngredient: 'सामग्री विकल्प',
    substitutions: 'विकल्प',
    selectLanguage: 'भाषा',
    step: 'चरण',
    of: 'का',
    remove: 'हटाएं',
    mealPlanEmpty: 'आपका मील प्लान खाली है',
    addRecipesToPlan: 'रेसिपी ब्राउज़ करें और मील प्लान में जोड़ें',
  },
  ml: {
    appName: 'സ്മാർട്ട് റെസിപ്പി പ്ലാനർ',
    home: 'ഹോം',
    recipes: 'പാചകക്കുറിപ്പുകൾ',
    mealPlanner: 'ഭക്ഷണ ആസൂത്രണം',
    favorites: 'പ്രിയപ്പെട്ടവ',
    dashboard: 'ഡാഷ്ബോർഡ്',
    search: 'തിരയുക',
    searchPlaceholder: 'പാചകക്കുറിപ്പുകൾ, ചേരുവകൾ തിരയുക...',
    allCuisines: 'എല്ലാ പാചക രീതികളും',
    allDiets: 'എല്ലാ ഭക്ഷണ ക്രമങ്ങളും',
    allCategories: 'എല്ലാ വിഭാഗങ്ങളും',
    cookingTime: 'പാചക സമയം',
    minutes: 'മിനിറ്റ്',
    servings: 'വിളമ്പൽ',
    calories: 'കലോറികൾ',
    protein: 'പ്രോട്ടീൻ',
    carbs: 'കാർബ്സ്',
    fat: 'കൊഴുപ്പ്',
    ingredients: 'ചേരുവകൾ',
    steps: 'ഘട്ടങ്ങൾ',
    noRecipesFound: 'പാചകക്കുറിപ്പുകൾ കണ്ടെത്തിയില്ല',
    viewRecipe: 'പാചകക്കുറിപ്പ് കാണുക',
    addToFavorites: 'പ്രിയപ്പെട്ടവയിൽ ചേർക്കുക',
    removeFromFavorites: 'പ്രിയപ്പെട്ടവയിൽ നിന്ന് നീക്കം ചെയ്യുക',
    addToMealPlan: 'ഭക്ഷണ പ്ലാനിൽ ചേർക്കുക',
    breakfast: 'പ്രഭാതഭക്ഷണം',
    lunch: 'ഉച്ചഭക്ഷണം',
    dinner: 'അത്താഴം',
    snack: 'ലഘുഭക്ഷണം',
    monday: 'തിങ്കൾ',
    tuesday: 'ചൊവ്വ',
    wednesday: 'ബുധൻ',
    thursday: 'വ്യാഴം',
    friday: 'വെള്ളി',
    saturday: 'ശനി',
    sunday: 'ഞായർ',
    groceryList: 'പലചരക്ക് ലിസ്റ്റ്',
    generateGroceryList: 'പലചരക്ക് ലിസ്റ്റ് സൃഷ്ടിക്കുക',
    clearMealPlan: 'ഭക്ഷണ പ്ലാൻ മായ്ക്കുക',
    nutritionOverview: 'പോഷക അവലോകനം',
    weeklyCalories: 'ആഴ്ചയിലെ കലോറികൾ',
    macroBreakdown: 'മാക്രോ വിശദാംശങ്ങൾ',
    dailyAverage: 'പ്രതിദിന ശരാശരി',
    totalRecipes: 'ആകെ പാചകക്കുറിപ്പുകൾ',
    cuisinesExplored: 'പര്യവേക്ഷണം ചെയ്ത പാചക രീതികൾ',
    mealsPlanned: 'ആസൂത്രണം ചെയ്ത ഭക്ഷണങ്ങൾ',
    caloriesTracked: 'ട്രാക്ക് ചെയ്ത കലോറികൾ',
    veg: 'സസ്യാഹാരം',
    nonVeg: 'മാംസാഹാരം',
    vegan: 'വീഗൻ',
    filterByCuisine: 'പാചക രീതി അനുസരിച്ച് ഫിൽട്ടർ',
    filterByDiet: 'ഭക്ഷണ ക്രമം അനുസരിച്ച് ഫിൽട്ടർ',
    filterByCategory: 'വിഭാഗം അനുസരിച്ച് ഫിൽട്ടർ',
    maxCookingTime: 'പരമാവധി പാചക സമയം',
    calorieRange: 'കലോറി പരിധി',
    clearFilters: 'ഫിൽട്ടറുകൾ മായ്ക്കുക',
    rating: 'റേറ്റിംഗ്',
    reviews: 'അവലോകനങ്ങൾ',
    substituteIngredient: 'പകരം ചേരുവ',
    substitutions: 'പകരക്കാർ',
    selectLanguage: 'ഭാഷ',
    step: 'ഘട്ടം',
    of: 'ൽ',
    remove: 'നീക്കം ചെയ്യുക',
    mealPlanEmpty: 'നിങ്ങളുടെ ഭക്ഷണ പ്ലാൻ ശൂന്യമാണ്',
    addRecipesToPlan: 'പാചകക്കുറിപ്പുകൾ ബ്രൗസ് ചെയ്ത് ഭക്ഷണ പ്ലാനിൽ ചേർക്കുക',
  },
};
