export type Recipe = {
  id: string;
  name: string;
  nameTranslations: { ta?: string; hi?: string; ml?: string };
  cuisine: string;
  category: string;
  dietType: 'veg' | 'non-veg' | 'vegan';
  tags: string[];
  cookingTime: number;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image: string;
  ingredients: { name: string; amount: string; unit: string }[];
  steps: string[];
  stepsTranslations?: { ta?: string[]; hi?: string[]; ml?: string[] };
  rating: number;
  reviews: number;
};

export const cuisines = [
  'Indian', 'Chinese', 'Italian', 'Mexican', 'Japanese', 'Korean',
  'Thai', 'American', 'Arabic', 'French', 'Vietnamese', 'Greek',
  'Turkish', 'Ethiopian', 'Brazilian'
];

export const categories = [
  'Main Course', 'Appetizer', 'Dessert', 'Breakfast', 'Soup',
  'Salad', 'Drinks', 'Snack', 'Street Food', 'Bakery'
];

export const dietTypes = ['veg', 'non-veg', 'vegan'] as const;

export const dietTags = [
  'Keto', 'High Protein', 'Low Carb', 'Gluten Free', 'Dairy Free',
  'Sugar Free', 'Paleo', 'Whole30', 'Mediterranean', 'Diabetic Friendly'
];

export const recipes: Recipe[] = [
  {
    id: '1', name: 'Butter Chicken', nameTranslations: { ta: 'பட்டர் சிக்கன்', hi: 'बटर चिकन', ml: 'ബട്ടർ ചിക്കൻ' },
    cuisine: 'Indian', category: 'Main Course', dietType: 'non-veg', tags: ['High Protein'],
    cookingTime: 45, servings: 4, calories: 490, protein: 32, carbs: 18, fat: 28,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600',
    ingredients: [
      { name: 'Chicken', amount: '500', unit: 'g' }, { name: 'Butter', amount: '3', unit: 'tbsp' },
      { name: 'Tomato puree', amount: '200', unit: 'ml' }, { name: 'Cream', amount: '100', unit: 'ml' },
      { name: 'Garam masala', amount: '2', unit: 'tsp' }, { name: 'Ginger garlic paste', amount: '2', unit: 'tbsp' },
      { name: 'Kasuri methi', amount: '1', unit: 'tsp' }, { name: 'Salt', amount: '1', unit: 'tsp' }
    ],
    steps: ['Marinate chicken with yogurt and spices for 30 minutes', 'Cook chicken in tandoor or oven until charred', 'Sauté ginger-garlic paste in butter', 'Add tomato puree and cook for 10 minutes', 'Add spices and cream, simmer', 'Add cooked chicken, garnish with kasuri methi'],
    rating: 4.8, reviews: 324
  },
  {
    id: '2', name: 'Masala Dosa', nameTranslations: { ta: 'மசாலா தோசை', hi: 'मसाला डोसा', ml: 'മസാല ദോശ' },
    cuisine: 'Indian', category: 'Breakfast', dietType: 'veg', tags: [],
    cookingTime: 30, servings: 4, calories: 250, protein: 8, carbs: 42, fat: 6,
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600',
    ingredients: [
      { name: 'Dosa batter', amount: '500', unit: 'ml' }, { name: 'Potato', amount: '4', unit: 'medium' },
      { name: 'Onion', amount: '2', unit: 'medium' }, { name: 'Mustard seeds', amount: '1', unit: 'tsp' },
      { name: 'Turmeric', amount: '0.5', unit: 'tsp' }, { name: 'Curry leaves', amount: '10', unit: 'leaves' }
    ],
    steps: ['Boil and mash potatoes', 'Temper mustard seeds, add onions and curry leaves', 'Add turmeric and mashed potatoes', 'Spread dosa batter on hot griddle', 'Add potato filling and fold'],
    rating: 4.7, reviews: 256
  },
  {
    id: '3', name: 'Kung Pao Chicken', nameTranslations: { ta: 'குங் பாவ் சிக்கன்', hi: 'कुंग पाओ चिकन', ml: 'കുങ് പാവോ ചിക്കൻ' },
    cuisine: 'Chinese', category: 'Main Course', dietType: 'non-veg', tags: ['High Protein'],
    cookingTime: 25, servings: 3, calories: 380, protein: 30, carbs: 20, fat: 18,
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600',
    ingredients: [
      { name: 'Chicken breast', amount: '400', unit: 'g' }, { name: 'Peanuts', amount: '50', unit: 'g' },
      { name: 'Dried red chilies', amount: '8', unit: 'pcs' }, { name: 'Soy sauce', amount: '3', unit: 'tbsp' },
      { name: 'Vinegar', amount: '1', unit: 'tbsp' }, { name: 'Cornstarch', amount: '2', unit: 'tsp' }
    ],
    steps: ['Cut chicken into cubes and marinate with soy sauce and cornstarch', 'Stir-fry dried chilies in oil', 'Add chicken and cook until golden', 'Add sauce mixture and peanuts', 'Toss well and serve hot'],
    rating: 4.5, reviews: 189
  },
  {
    id: '4', name: 'Margherita Pizza', nameTranslations: { ta: 'மார்கரிட்டா பீட்சா', hi: 'मार्गेरिटा पिज़्ज़ा', ml: 'മാർഗരീറ്റ പിസ' },
    cuisine: 'Italian', category: 'Main Course', dietType: 'veg', tags: [],
    cookingTime: 35, servings: 2, calories: 420, protein: 18, carbs: 52, fat: 16,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600',
    ingredients: [
      { name: 'Pizza dough', amount: '300', unit: 'g' }, { name: 'Mozzarella', amount: '200', unit: 'g' },
      { name: 'San Marzano tomatoes', amount: '200', unit: 'g' }, { name: 'Fresh basil', amount: '10', unit: 'leaves' },
      { name: 'Olive oil', amount: '2', unit: 'tbsp' }
    ],
    steps: ['Stretch dough into a round shape', 'Spread crushed tomatoes evenly', 'Add torn mozzarella pieces', 'Bake at 250°C for 10-12 minutes', 'Top with fresh basil and olive oil'],
    rating: 4.6, reviews: 412
  },
  {
    id: '5', name: 'Tacos al Pastor', nameTranslations: { ta: 'டாகோஸ் அல் பாஸ்டர்', hi: 'टाकोस अल पास्टर', ml: 'ടാക്കോസ് അൽ പാസ്റ്റർ' },
    cuisine: 'Mexican', category: 'Street Food', dietType: 'non-veg', tags: ['High Protein'],
    cookingTime: 40, servings: 4, calories: 350, protein: 25, carbs: 28, fat: 15,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600',
    ingredients: [
      { name: 'Pork shoulder', amount: '500', unit: 'g' }, { name: 'Pineapple', amount: '4', unit: 'slices' },
      { name: 'Corn tortillas', amount: '12', unit: 'pcs' }, { name: 'Achiote paste', amount: '2', unit: 'tbsp' },
      { name: 'Onion', amount: '1', unit: 'medium' }, { name: 'Cilantro', amount: '1', unit: 'bunch' }
    ],
    steps: ['Marinate pork with achiote paste overnight', 'Grill pork with pineapple slices', 'Shred pork and char pineapple', 'Warm tortillas on griddle', 'Assemble with onion, cilantro, and salsa'],
    rating: 4.9, reviews: 278
  },
  {
    id: '6', name: 'Sushi Roll', nameTranslations: { ta: 'சுஷி ரோல்', hi: 'सुशी रोल', ml: 'സുഷി റോൾ' },
    cuisine: 'Japanese', category: 'Main Course', dietType: 'non-veg', tags: ['Low Carb'],
    cookingTime: 50, servings: 4, calories: 290, protein: 18, carbs: 38, fat: 8,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600',
    ingredients: [
      { name: 'Sushi rice', amount: '300', unit: 'g' }, { name: 'Nori sheets', amount: '4', unit: 'sheets' },
      { name: 'Salmon', amount: '200', unit: 'g' }, { name: 'Avocado', amount: '1', unit: 'medium' },
      { name: 'Cucumber', amount: '1', unit: 'medium' }, { name: 'Rice vinegar', amount: '3', unit: 'tbsp' }
    ],
    steps: ['Cook sushi rice and season with rice vinegar', 'Place nori on bamboo mat', 'Spread rice evenly, leaving 1cm edge', 'Add salmon, avocado, and cucumber strips', 'Roll tightly and slice into pieces'],
    rating: 4.7, reviews: 198
  },
  {
    id: '7', name: 'Bibimbap', nameTranslations: { ta: 'பிபிம்பாப்', hi: 'बिबिम्बाप', ml: 'ബിബിംബാപ്' },
    cuisine: 'Korean', category: 'Main Course', dietType: 'non-veg', tags: ['High Protein'],
    cookingTime: 35, servings: 2, calories: 520, protein: 28, carbs: 60, fat: 18,
    image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=600',
    ingredients: [
      { name: 'Rice', amount: '300', unit: 'g' }, { name: 'Beef (bulgogi)', amount: '200', unit: 'g' },
      { name: 'Spinach', amount: '100', unit: 'g' }, { name: 'Carrots', amount: '1', unit: 'medium' },
      { name: 'Egg', amount: '2', unit: 'pcs' }, { name: 'Gochujang', amount: '2', unit: 'tbsp' }
    ],
    steps: ['Cook rice and keep warm', 'Sauté each vegetable separately with sesame oil', 'Cook bulgogi beef until caramelized', 'Fry eggs sunny-side up', 'Arrange all toppings over rice, add gochujang'],
    rating: 4.6, reviews: 165
  },
  {
    id: '8', name: 'Pad Thai', nameTranslations: { ta: 'பாட் தாய்', hi: 'पैड थाई', ml: 'പാഡ് തായ്' },
    cuisine: 'Thai', category: 'Main Course', dietType: 'non-veg', tags: [],
    cookingTime: 25, servings: 3, calories: 400, protein: 20, carbs: 48, fat: 14,
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600',
    ingredients: [
      { name: 'Rice noodles', amount: '250', unit: 'g' }, { name: 'Shrimp', amount: '200', unit: 'g' },
      { name: 'Tamarind paste', amount: '3', unit: 'tbsp' }, { name: 'Fish sauce', amount: '2', unit: 'tbsp' },
      { name: 'Peanuts', amount: '50', unit: 'g' }, { name: 'Bean sprouts', amount: '100', unit: 'g' }
    ],
    steps: ['Soak rice noodles in warm water', 'Cook shrimp until pink', 'Make sauce with tamarind, fish sauce, and sugar', 'Stir-fry noodles with sauce', 'Add bean sprouts and crushed peanuts'],
    rating: 4.8, reviews: 342
  },
  {
    id: '9', name: 'Classic Burger', nameTranslations: { ta: 'கிளாசிக் பர்கர்', hi: 'क्लासिक बर्गर', ml: 'ക്ലാസിക് ബർഗർ' },
    cuisine: 'American', category: 'Main Course', dietType: 'non-veg', tags: ['High Protein'],
    cookingTime: 20, servings: 2, calories: 650, protein: 35, carbs: 40, fat: 38,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
    ingredients: [
      { name: 'Ground beef', amount: '400', unit: 'g' }, { name: 'Burger buns', amount: '2', unit: 'pcs' },
      { name: 'Cheddar cheese', amount: '2', unit: 'slices' }, { name: 'Lettuce', amount: '2', unit: 'leaves' },
      { name: 'Tomato', amount: '1', unit: 'medium' }, { name: 'Onion', amount: '1', unit: 'medium' }
    ],
    steps: ['Form beef patties and season well', 'Grill patties for 4 min each side', 'Toast burger buns lightly', 'Add cheese on patty to melt', 'Assemble with lettuce, tomato, and onion'],
    rating: 4.5, reviews: 567
  },
  {
    id: '10', name: 'Hummus', nameTranslations: { ta: 'ஹம்முஸ்', hi: 'हम्मस', ml: 'ഹമ്മസ്' },
    cuisine: 'Arabic', category: 'Appetizer', dietType: 'vegan', tags: ['Gluten Free', 'High Protein'],
    cookingTime: 15, servings: 6, calories: 170, protein: 8, carbs: 20, fat: 7,
    image: 'https://images.unsplash.com/photo-1637949385162-e416000586e0?w=600',
    ingredients: [
      { name: 'Chickpeas', amount: '400', unit: 'g' }, { name: 'Tahini', amount: '3', unit: 'tbsp' },
      { name: 'Lemon juice', amount: '3', unit: 'tbsp' }, { name: 'Garlic', amount: '2', unit: 'cloves' },
      { name: 'Olive oil', amount: '3', unit: 'tbsp' }, { name: 'Cumin', amount: '1', unit: 'tsp' }
    ],
    steps: ['Blend chickpeas until smooth', 'Add tahini, lemon juice, and garlic', 'Blend until creamy', 'Drizzle with olive oil and cumin', 'Serve with pita bread'],
    rating: 4.4, reviews: 210
  },
  {
    id: '11', name: 'Croissant', nameTranslations: { ta: 'குரோசான்ட்', hi: 'क्रोइसैंट', ml: 'ക്രോസോങ്' },
    cuisine: 'French', category: 'Bakery', dietType: 'veg', tags: [],
    cookingTime: 180, servings: 8, calories: 310, protein: 6, carbs: 32, fat: 18,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=600',
    ingredients: [
      { name: 'All-purpose flour', amount: '500', unit: 'g' }, { name: 'Butter (cold)', amount: '280', unit: 'g' },
      { name: 'Sugar', amount: '50', unit: 'g' }, { name: 'Yeast', amount: '7', unit: 'g' },
      { name: 'Milk', amount: '280', unit: 'ml' }, { name: 'Salt', amount: '10', unit: 'g' }
    ],
    steps: ['Make dough with flour, milk, yeast, sugar, salt', 'Roll cold butter into dough', 'Fold and roll three times (laminating)', 'Chill between folds for 30 min', 'Cut triangles and roll into croissants', 'Proof for 1 hour, then bake at 200°C for 15 min'],
    rating: 4.8, reviews: 145
  },
  {
    id: '12', name: 'Paneer Tikka', nameTranslations: { ta: 'பனீர் டிக்கா', hi: 'पनीर टिक्का', ml: 'പനീർ ടിക്ക' },
    cuisine: 'Indian', category: 'Appetizer', dietType: 'veg', tags: ['High Protein', 'Keto'],
    cookingTime: 30, servings: 4, calories: 320, protein: 22, carbs: 8, fat: 24,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600',
    ingredients: [
      { name: 'Paneer', amount: '400', unit: 'g' }, { name: 'Yogurt', amount: '100', unit: 'ml' },
      { name: 'Bell peppers', amount: '2', unit: 'medium' }, { name: 'Tikka masala', amount: '2', unit: 'tbsp' },
      { name: 'Lemon juice', amount: '2', unit: 'tbsp' }
    ],
    steps: ['Cut paneer and veggies into cubes', 'Marinate with yogurt, tikka masala, and lemon', 'Thread onto skewers', 'Grill or bake at 220°C for 15 min', 'Serve with mint chutney'],
    rating: 4.7, reviews: 198
  },
  {
    id: '13', name: 'Green Smoothie Bowl', nameTranslations: { ta: 'கிரீன் ஸ்மூத்தி போல்', hi: 'ग्रीन स्मूदी बाउल', ml: 'ഗ്രീൻ സ്മൂത്തി ബൗൾ' },
    cuisine: 'American', category: 'Breakfast', dietType: 'vegan', tags: ['Low Carb', 'Keto'],
    cookingTime: 10, servings: 1, calories: 280, protein: 8, carbs: 38, fat: 10,
    image: 'https://images.unsplash.com/photo-1511690743698-d9d18f7e20f1?w=600',
    ingredients: [
      { name: 'Spinach', amount: '2', unit: 'cups' }, { name: 'Banana', amount: '1', unit: 'medium' },
      { name: 'Almond milk', amount: '200', unit: 'ml' }, { name: 'Chia seeds', amount: '1', unit: 'tbsp' },
      { name: 'Granola', amount: '30', unit: 'g' }, { name: 'Berries', amount: '50', unit: 'g' }
    ],
    steps: ['Blend spinach, banana, and almond milk', 'Pour into bowl', 'Top with granola, chia seeds, and berries', 'Drizzle with honey if desired'],
    rating: 4.3, reviews: 123
  },
  {
    id: '14', name: 'Tom Yum Soup', nameTranslations: { ta: 'டாம் யம் சூப்', hi: 'टॉम यम सूप', ml: 'ടോം യം സൂപ്പ്' },
    cuisine: 'Thai', category: 'Soup', dietType: 'non-veg', tags: ['Low Carb'],
    cookingTime: 25, servings: 4, calories: 180, protein: 16, carbs: 12, fat: 8,
    image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=600',
    ingredients: [
      { name: 'Shrimp', amount: '300', unit: 'g' }, { name: 'Lemongrass', amount: '3', unit: 'stalks' },
      { name: 'Galangal', amount: '5', unit: 'slices' }, { name: 'Kaffir lime leaves', amount: '5', unit: 'leaves' },
      { name: 'Tom yum paste', amount: '3', unit: 'tbsp' }, { name: 'Mushrooms', amount: '100', unit: 'g' }
    ],
    steps: ['Boil water with lemongrass, galangal, and lime leaves', 'Add tom yum paste and mushrooms', 'Add shrimp and cook for 3 minutes', 'Season with fish sauce and lime juice', 'Garnish with cilantro'],
    rating: 4.6, reviews: 178
  },
  {
    id: '15', name: 'Falafel', nameTranslations: { ta: 'ஃபலாஃபல்', hi: 'फलाफेल', ml: 'ഫലാഫൽ' },
    cuisine: 'Arabic', category: 'Street Food', dietType: 'vegan', tags: ['High Protein'],
    cookingTime: 35, servings: 4, calories: 330, protein: 14, carbs: 30, fat: 18,
    image: 'https://images.unsplash.com/photo-1593001872095-7d5b3868fb1d?w=600',
    ingredients: [
      { name: 'Chickpeas (dried)', amount: '400', unit: 'g' }, { name: 'Parsley', amount: '1', unit: 'bunch' },
      { name: 'Cilantro', amount: '0.5', unit: 'bunch' }, { name: 'Onion', amount: '1', unit: 'medium' },
      { name: 'Garlic', amount: '4', unit: 'cloves' }, { name: 'Cumin', amount: '2', unit: 'tsp' }
    ],
    steps: ['Soak chickpeas overnight', 'Blend with herbs, onion, garlic, and spices', 'Form into balls or patties', 'Deep fry at 180°C until golden brown', 'Serve with tahini sauce and pita'],
    rating: 4.5, reviews: 234
  },
  {
    id: '16', name: 'Tiramisu', nameTranslations: { ta: 'திரமிசு', hi: 'तिरामिसु', ml: 'ടിറാമിസു' },
    cuisine: 'Italian', category: 'Dessert', dietType: 'veg', tags: [],
    cookingTime: 30, servings: 6, calories: 450, protein: 8, carbs: 42, fat: 28,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600',
    ingredients: [
      { name: 'Mascarpone', amount: '500', unit: 'g' }, { name: 'Ladyfingers', amount: '24', unit: 'pcs' },
      { name: 'Espresso', amount: '300', unit: 'ml' }, { name: 'Eggs', amount: '4', unit: 'pcs' },
      { name: 'Sugar', amount: '100', unit: 'g' }, { name: 'Cocoa powder', amount: '2', unit: 'tbsp' }
    ],
    steps: ['Separate eggs; beat yolks with sugar until creamy', 'Fold in mascarpone cheese', 'Whip egg whites and fold into mixture', 'Dip ladyfingers in espresso briefly', 'Layer ladyfingers and cream, repeat', 'Refrigerate 4 hours, dust with cocoa'],
    rating: 4.9, reviews: 389
  },
  {
    id: '17', name: 'Chicken Biryani', nameTranslations: { ta: 'சிக்கன் பிரியாணி', hi: 'चिकन बिरयानी', ml: 'ചിക്കൻ ബിരിയാണി' },
    cuisine: 'Indian', category: 'Main Course', dietType: 'non-veg', tags: ['High Protein'],
    cookingTime: 60, servings: 6, calories: 550, protein: 30, carbs: 58, fat: 22,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600',
    ingredients: [
      { name: 'Basmati rice', amount: '500', unit: 'g' }, { name: 'Chicken', amount: '750', unit: 'g' },
      { name: 'Onions', amount: '4', unit: 'large' }, { name: 'Yogurt', amount: '200', unit: 'ml' },
      { name: 'Biryani masala', amount: '3', unit: 'tbsp' }, { name: 'Saffron', amount: '1', unit: 'pinch' },
      { name: 'Mint leaves', amount: '1', unit: 'bunch' }, { name: 'Ghee', amount: '4', unit: 'tbsp' }
    ],
    steps: ['Marinate chicken with yogurt and spices', 'Fry onions until golden brown', 'Cook rice until 70% done', 'Layer chicken and rice in pot', 'Add saffron milk and fried onions', 'Cook on dum (low heat) for 25 minutes'],
    rating: 4.9, reviews: 567
  },
  {
    id: '18', name: 'Mango Lassi', nameTranslations: { ta: 'மாங்கோ லஸ்சி', hi: 'मैंगो लस्सी', ml: 'മാങ്ങോ ലസ്സി' },
    cuisine: 'Indian', category: 'Drinks', dietType: 'veg', tags: [],
    cookingTime: 5, servings: 2, calories: 200, protein: 6, carbs: 38, fat: 4,
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600',
    ingredients: [
      { name: 'Mango pulp', amount: '200', unit: 'ml' }, { name: 'Yogurt', amount: '200', unit: 'ml' },
      { name: 'Sugar', amount: '2', unit: 'tbsp' }, { name: 'Cardamom', amount: '0.5', unit: 'tsp' },
      { name: 'Ice', amount: '1', unit: 'cup' }
    ],
    steps: ['Blend mango pulp with yogurt', 'Add sugar and cardamom', 'Add ice and blend until smooth', 'Pour into glasses and garnish with saffron'],
    rating: 4.6, reviews: 145
  },
  {
    id: '19', name: 'Caesar Salad', nameTranslations: { ta: 'சீசர் சாலட்', hi: 'सीज़र सलाद', ml: 'സീസർ സാലഡ്' },
    cuisine: 'American', category: 'Salad', dietType: 'non-veg', tags: ['Low Carb', 'Keto'],
    cookingTime: 15, servings: 2, calories: 320, protein: 18, carbs: 12, fat: 24,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600',
    ingredients: [
      { name: 'Romaine lettuce', amount: '1', unit: 'head' }, { name: 'Parmesan', amount: '50', unit: 'g' },
      { name: 'Croutons', amount: '1', unit: 'cup' }, { name: 'Caesar dressing', amount: '60', unit: 'ml' },
      { name: 'Chicken breast', amount: '200', unit: 'g' }, { name: 'Lemon', amount: '1', unit: 'medium' }
    ],
    steps: ['Grill chicken breast and slice', 'Wash and chop romaine lettuce', 'Toss lettuce with Caesar dressing', 'Add croutons and shaved parmesan', 'Top with sliced chicken'],
    rating: 4.3, reviews: 234
  },
  {
    id: '20', name: 'Ramen', nameTranslations: { ta: 'ராமன்', hi: 'रामेन', ml: 'റാമെൻ' },
    cuisine: 'Japanese', category: 'Soup', dietType: 'non-veg', tags: ['High Protein'],
    cookingTime: 45, servings: 2, calories: 480, protein: 28, carbs: 52, fat: 18,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600',
    ingredients: [
      { name: 'Ramen noodles', amount: '200', unit: 'g' }, { name: 'Pork belly', amount: '200', unit: 'g' },
      { name: 'Soft boiled egg', amount: '2', unit: 'pcs' }, { name: 'Chicken broth', amount: '800', unit: 'ml' },
      { name: 'Soy sauce', amount: '3', unit: 'tbsp' }, { name: 'Nori', amount: '4', unit: 'sheets' }
    ],
    steps: ['Simmer pork belly in soy sauce broth for 1 hour', 'Cook ramen noodles al dente', 'Prepare soft boiled eggs (6 minutes)', 'Heat chicken broth with seasonings', 'Assemble: noodles, broth, pork, egg, nori'],
    rating: 4.8, reviews: 298
  },
  {
    id: '21', name: 'Guacamole', nameTranslations: { ta: 'குவாகமோலே', hi: 'ग्वाकामोले', ml: 'ഗ്വാക്കമോളെ' },
    cuisine: 'Mexican', category: 'Appetizer', dietType: 'vegan', tags: ['Keto', 'Gluten Free'],
    cookingTime: 10, servings: 4, calories: 160, protein: 2, carbs: 9, fat: 14,
    image: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=600',
    ingredients: [
      { name: 'Avocado', amount: '3', unit: 'medium' }, { name: 'Lime', amount: '2', unit: 'medium' },
      { name: 'Cilantro', amount: '0.5', unit: 'bunch' }, { name: 'Red onion', amount: '0.5', unit: 'medium' },
      { name: 'Jalapeño', amount: '1', unit: 'medium' }, { name: 'Tomato', amount: '1', unit: 'medium' }
    ],
    steps: ['Mash avocados to desired consistency', 'Add diced onion, tomato, jalapeño', 'Mix in lime juice and chopped cilantro', 'Season with salt', 'Serve immediately with tortilla chips'],
    rating: 4.5, reviews: 312
  },
  {
    id: '22', name: 'Kimchi Fried Rice', nameTranslations: { ta: 'கிம்ச்சி ஃப்ரைட் ரைஸ்', hi: 'किमची फ्राइड राइस', ml: 'കിംചി ഫ്രൈഡ് റൈസ്' },
    cuisine: 'Korean', category: 'Main Course', dietType: 'non-veg', tags: [],
    cookingTime: 15, servings: 2, calories: 420, protein: 18, carbs: 55, fat: 14,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600',
    ingredients: [
      { name: 'Cooked rice', amount: '400', unit: 'g' }, { name: 'Kimchi', amount: '200', unit: 'g' },
      { name: 'Spam or pork', amount: '100', unit: 'g' }, { name: 'Egg', amount: '2', unit: 'pcs' },
      { name: 'Sesame oil', amount: '2', unit: 'tbsp' }, { name: 'Green onions', amount: '3', unit: 'stalks' }
    ],
    steps: ['Dice spam/pork and fry until crispy', 'Add chopped kimchi and stir-fry', 'Add cold rice and mix well', 'Season with sesame oil and gochujang', 'Top with fried egg and green onions'],
    rating: 4.6, reviews: 167
  },
  {
    id: '23', name: 'Pani Puri', nameTranslations: { ta: 'பானி பூரி', hi: 'पानी पूरी', ml: 'പാനി പൂരി' },
    cuisine: 'Indian', category: 'Street Food', dietType: 'veg', tags: [],
    cookingTime: 30, servings: 4, calories: 180, protein: 4, carbs: 32, fat: 6,
    image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=600',
    ingredients: [
      { name: 'Puri shells', amount: '40', unit: 'pcs' }, { name: 'Boiled potatoes', amount: '3', unit: 'medium' },
      { name: 'Chickpeas', amount: '100', unit: 'g' }, { name: 'Tamarind chutney', amount: '100', unit: 'ml' },
      { name: 'Mint water', amount: '500', unit: 'ml' }, { name: 'Onion', amount: '1', unit: 'medium' }
    ],
    steps: ['Prepare spicy mint water with green chilies and mint', 'Make sweet tamarind chutney', 'Mash potatoes with spices and chickpeas', 'Crack open puri shells', 'Fill with potato mix, add mint water and chutney'],
    rating: 4.8, reviews: 456
  },
  {
    id: '24', name: 'Chocolate Lava Cake', nameTranslations: { ta: 'சாக்லேட் லாவா கேக்', hi: 'चॉकलेट लावा केक', ml: 'ചോക്ലേറ്റ് ലാവ കേക്ക്' },
    cuisine: 'French', category: 'Dessert', dietType: 'veg', tags: [],
    cookingTime: 25, servings: 4, calories: 480, protein: 8, carbs: 42, fat: 32,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600',
    ingredients: [
      { name: 'Dark chocolate', amount: '200', unit: 'g' }, { name: 'Butter', amount: '100', unit: 'g' },
      { name: 'Eggs', amount: '3', unit: 'pcs' }, { name: 'Sugar', amount: '80', unit: 'g' },
      { name: 'Flour', amount: '50', unit: 'g' }, { name: 'Vanilla extract', amount: '1', unit: 'tsp' }
    ],
    steps: ['Melt chocolate and butter together', 'Whisk eggs with sugar until fluffy', 'Fold in chocolate mixture', 'Add flour gently', 'Pour into greased ramekins', 'Bake at 200°C for 12 minutes — center should be gooey'],
    rating: 4.9, reviews: 289
  },
  {
    id: '25', name: 'Greek Salad', nameTranslations: { ta: 'கிரேக்க சாலட்', hi: 'ग्रीक सलाद', ml: 'ഗ്രീക്ക് സാലഡ്' },
    cuisine: 'Greek', category: 'Salad', dietType: 'veg', tags: ['Keto', 'Gluten Free', 'Mediterranean'],
    cookingTime: 10, servings: 2, calories: 220, protein: 8, carbs: 12, fat: 16,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600',
    ingredients: [
      { name: 'Cucumber', amount: '1', unit: 'large' }, { name: 'Tomatoes', amount: '3', unit: 'medium' },
      { name: 'Feta cheese', amount: '150', unit: 'g' }, { name: 'Kalamata olives', amount: '50', unit: 'g' },
      { name: 'Red onion', amount: '0.5', unit: 'medium' }, { name: 'Olive oil', amount: '3', unit: 'tbsp' }
    ],
    steps: ['Chop cucumber and tomatoes into chunks', 'Slice red onion thinly', 'Add olives and crumbled feta', 'Dress with olive oil and oregano', 'Season with salt and pepper'],
    rating: 4.4, reviews: 189
  },
  {
    id: '26', name: 'Chole Bhature', nameTranslations: { ta: 'சோலே பட்டூரே', hi: 'छोले भटूरे', ml: 'ചോലെ ഭട്ടൂരെ' },
    cuisine: 'Indian', category: 'Main Course', dietType: 'veg', tags: [],
    cookingTime: 50, servings: 4, calories: 580, protein: 18, carbs: 72, fat: 24,
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600',
    ingredients: [
      { name: 'Chickpeas', amount: '400', unit: 'g' }, { name: 'All-purpose flour', amount: '300', unit: 'g' },
      { name: 'Onion', amount: '2', unit: 'medium' }, { name: 'Tomatoes', amount: '3', unit: 'medium' },
      { name: 'Chole masala', amount: '2', unit: 'tbsp' }, { name: 'Oil for frying', amount: '500', unit: 'ml' }
    ],
    steps: ['Soak chickpeas overnight and pressure cook', 'Sauté onions, add tomatoes and chole masala', 'Add chickpeas and simmer for 20 minutes', 'Knead dough for bhature, let rest', 'Roll out and deep fry until puffed', 'Serve hot with pickled onions'],
    rating: 4.7, reviews: 345
  },
  {
    id: '27', name: 'Açaí Bowl', nameTranslations: { ta: 'அசாய் போல்', hi: 'अकाई बाउल', ml: 'അസായി ബൗൾ' },
    cuisine: 'Brazilian', category: 'Breakfast', dietType: 'vegan', tags: ['Gluten Free'],
    cookingTime: 10, servings: 1, calories: 340, protein: 6, carbs: 52, fat: 12,
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600',
    ingredients: [
      { name: 'Açaí puree', amount: '200', unit: 'g' }, { name: 'Banana', amount: '1', unit: 'medium' },
      { name: 'Granola', amount: '40', unit: 'g' }, { name: 'Strawberries', amount: '5', unit: 'pcs' },
      { name: 'Honey', amount: '1', unit: 'tbsp' }, { name: 'Coconut flakes', amount: '10', unit: 'g' }
    ],
    steps: ['Blend frozen açaí with banana until thick', 'Pour into bowl', 'Top with sliced strawberries and granola', 'Add coconut flakes and drizzle honey'],
    rating: 4.5, reviews: 156
  },
  {
    id: '28', name: 'Samosa', nameTranslations: { ta: 'சமோசா', hi: 'समोसा', ml: 'സമോസ' },
    cuisine: 'Indian', category: 'Street Food', dietType: 'veg', tags: [],
    cookingTime: 45, servings: 8, calories: 260, protein: 6, carbs: 32, fat: 12,
    image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=600',
    ingredients: [
      { name: 'All-purpose flour', amount: '250', unit: 'g' }, { name: 'Potatoes', amount: '4', unit: 'medium' },
      { name: 'Green peas', amount: '100', unit: 'g' }, { name: 'Cumin seeds', amount: '1', unit: 'tsp' },
      { name: 'Garam masala', amount: '1', unit: 'tsp' }, { name: 'Oil', amount: '500', unit: 'ml' }
    ],
    steps: ['Make dough with flour, oil, and water', 'Boil and mash potatoes', 'Mix with peas, cumin, garam masala', 'Shape dough into cones, fill with potato mix', 'Deep fry until golden and crispy', 'Serve with mint and tamarind chutney'],
    rating: 4.7, reviews: 423
  },
  {
    id: '29', name: 'Pho', nameTranslations: { ta: 'ஃபோ', hi: 'फो', ml: 'ഫോ' },
    cuisine: 'Vietnamese', category: 'Soup', dietType: 'non-veg', tags: ['Gluten Free'],
    cookingTime: 60, servings: 4, calories: 380, protein: 28, carbs: 42, fat: 10,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600',
    ingredients: [
      { name: 'Beef bones', amount: '1', unit: 'kg' }, { name: 'Rice noodles', amount: '300', unit: 'g' },
      { name: 'Beef sirloin', amount: '200', unit: 'g' }, { name: 'Star anise', amount: '3', unit: 'pcs' },
      { name: 'Bean sprouts', amount: '100', unit: 'g' }, { name: 'Thai basil', amount: '1', unit: 'bunch' }
    ],
    steps: ['Simmer beef bones for rich broth (2-3 hours)', 'Toast star anise and cinnamon', 'Cook rice noodles', 'Slice beef paper-thin', 'Ladle hot broth over noodles and raw beef', 'Serve with bean sprouts, basil, lime'],
    rating: 4.7, reviews: 212
  },
  {
    id: '30', name: 'Shakshuka', nameTranslations: { ta: 'ஷக்ஷூகா', hi: 'शक्शूका', ml: 'ഷക്ഷൂക' },
    cuisine: 'Arabic', category: 'Breakfast', dietType: 'veg', tags: ['Gluten Free', 'Keto'],
    cookingTime: 25, servings: 3, calories: 280, protein: 14, carbs: 16, fat: 18,
    image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=600',
    ingredients: [
      { name: 'Eggs', amount: '6', unit: 'pcs' }, { name: 'Tomatoes', amount: '6', unit: 'medium' },
      { name: 'Bell pepper', amount: '1', unit: 'medium' }, { name: 'Onion', amount: '1', unit: 'medium' },
      { name: 'Cumin', amount: '1', unit: 'tsp' }, { name: 'Paprika', amount: '1', unit: 'tsp' }
    ],
    steps: ['Sauté onion and bell pepper', 'Add crushed tomatoes, cumin, paprika', 'Simmer until thickened (10 min)', 'Make wells and crack eggs into sauce', 'Cover and cook until eggs set', 'Garnish with feta and cilantro'],
    rating: 4.6, reviews: 198
  },
  {
    id: '31', name: 'Vegan Buddha Bowl', nameTranslations: { ta: 'வீகன் புத்தா போல்', hi: 'वीगन बुद्ध बाउल', ml: 'വീഗൻ ബുദ്ധ ബൗൾ' },
    cuisine: 'American', category: 'Main Course', dietType: 'vegan', tags: ['High Protein', 'Gluten Free'],
    cookingTime: 30, servings: 2, calories: 420, protein: 18, carbs: 52, fat: 16,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
    ingredients: [
      { name: 'Quinoa', amount: '150', unit: 'g' }, { name: 'Sweet potato', amount: '1', unit: 'large' },
      { name: 'Chickpeas', amount: '200', unit: 'g' }, { name: 'Kale', amount: '2', unit: 'cups' },
      { name: 'Avocado', amount: '1', unit: 'medium' }, { name: 'Tahini', amount: '3', unit: 'tbsp' }
    ],
    steps: ['Cook quinoa according to package', 'Roast sweet potato and chickpeas at 200°C', 'Massage kale with olive oil and salt', 'Make tahini dressing with lemon and garlic', 'Assemble bowl with all ingredients', 'Drizzle with tahini dressing'],
    rating: 4.5, reviews: 178
  },
  {
    id: '32', name: 'Dalgona Coffee', nameTranslations: { ta: 'டல்கோனா காபி', hi: 'डलगोना कॉफ़ी', ml: 'ഡാൽഗോണ കോഫി' },
    cuisine: 'Korean', category: 'Drinks', dietType: 'veg', tags: [],
    cookingTime: 10, servings: 1, calories: 150, protein: 4, carbs: 22, fat: 5,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600',
    ingredients: [
      { name: 'Instant coffee', amount: '2', unit: 'tbsp' }, { name: 'Sugar', amount: '2', unit: 'tbsp' },
      { name: 'Hot water', amount: '2', unit: 'tbsp' }, { name: 'Milk', amount: '300', unit: 'ml' },
      { name: 'Ice', amount: '1', unit: 'cup' }
    ],
    steps: ['Whisk coffee, sugar, and hot water until fluffy', 'Fill glass with ice and milk', 'Spoon whipped coffee on top', 'Stir before drinking'],
    rating: 4.3, reviews: 234
  },
  {
    id: '33', name: 'Chicken Shawarma', nameTranslations: { ta: 'சிக்கன் ஷவர்மா', hi: 'चिकन शावर्मा', ml: 'ചിക്കൻ ഷവർമ' },
    cuisine: 'Arabic', category: 'Street Food', dietType: 'non-veg', tags: ['High Protein'],
    cookingTime: 35, servings: 4, calories: 420, protein: 32, carbs: 30, fat: 18,
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600',
    ingredients: [
      { name: 'Chicken thighs', amount: '600', unit: 'g' }, { name: 'Pita bread', amount: '4', unit: 'pcs' },
      { name: 'Yogurt', amount: '100', unit: 'ml' }, { name: 'Garlic sauce', amount: '100', unit: 'ml' },
      { name: 'Pickled turnips', amount: '50', unit: 'g' }, { name: 'Shawarma spice', amount: '3', unit: 'tbsp' }
    ],
    steps: ['Marinate chicken with shawarma spice and yogurt', 'Grill or pan-fry until charred', 'Slice chicken thinly', 'Warm pita bread', 'Assemble with garlic sauce, pickles, and veggies'],
    rating: 4.8, reviews: 345
  },
  {
    id: '34', name: 'Pasta Carbonara', nameTranslations: { ta: 'பாஸ்தா கார்பனாரா', hi: 'पास्ता कार्बोनारा', ml: 'പാസ്ത കാർബൊണാര' },
    cuisine: 'Italian', category: 'Main Course', dietType: 'non-veg', tags: [],
    cookingTime: 20, servings: 3, calories: 520, protein: 24, carbs: 55, fat: 22,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600',
    ingredients: [
      { name: 'Spaghetti', amount: '350', unit: 'g' }, { name: 'Guanciale', amount: '150', unit: 'g' },
      { name: 'Egg yolks', amount: '4', unit: 'pcs' }, { name: 'Pecorino Romano', amount: '100', unit: 'g' },
      { name: 'Black pepper', amount: '2', unit: 'tsp' }
    ],
    steps: ['Cook spaghetti in salted water', 'Crisp guanciale in pan', 'Mix egg yolks with grated pecorino', 'Toss hot pasta with guanciale', 'Remove from heat, add egg mixture', 'Serve with extra pecorino and pepper'],
    rating: 4.7, reviews: 312
  },
  {
    id: '35', name: 'Matcha Latte', nameTranslations: { ta: 'மாட்சா லட்டே', hi: 'माचा लैटे', ml: 'മാച്ച ലാറ്റെ' },
    cuisine: 'Japanese', category: 'Drinks', dietType: 'veg', tags: [],
    cookingTime: 5, servings: 1, calories: 120, protein: 4, carbs: 16, fat: 4,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600',
    ingredients: [
      { name: 'Matcha powder', amount: '2', unit: 'tsp' }, { name: 'Hot water', amount: '60', unit: 'ml' },
      { name: 'Milk', amount: '240', unit: 'ml' }, { name: 'Honey', amount: '1', unit: 'tsp' }
    ],
    steps: ['Sift matcha powder into bowl', 'Add hot water and whisk until frothy', 'Heat and froth milk', 'Pour matcha into cup, add milk', 'Sweeten with honey if desired'],
    rating: 4.4, reviews: 167
  },
  {
    id: '36', name: 'Idli Sambar', nameTranslations: { ta: 'இட்லி சாம்பார்', hi: 'इडली सांभर', ml: 'ഇഡ്ഡലി സാമ്പാർ' },
    cuisine: 'Indian', category: 'Breakfast', dietType: 'veg', tags: ['Gluten Free'],
    cookingTime: 20, servings: 4, calories: 220, protein: 10, carbs: 40, fat: 3,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600',
    ingredients: [
      { name: 'Idli batter', amount: '500', unit: 'ml' }, { name: 'Toor dal', amount: '200', unit: 'g' },
      { name: 'Mixed vegetables', amount: '200', unit: 'g' }, { name: 'Sambar powder', amount: '2', unit: 'tbsp' },
      { name: 'Tamarind', amount: '1', unit: 'tbsp' }, { name: 'Mustard seeds', amount: '1', unit: 'tsp' }
    ],
    steps: ['Steam idli batter in moulds for 10 minutes', 'Cook toor dal until soft', 'Boil vegetables with sambar powder and tamarind', 'Add cooked dal and simmer', 'Temper with mustard seeds and curry leaves', 'Serve idli with hot sambar and coconut chutney'],
    rating: 4.6, reviews: 289
  },
  {
    id: '37', name: 'Baklava', nameTranslations: { ta: 'பக்லாவா', hi: 'बक्लावा', ml: 'ബക്ലാവ' },
    cuisine: 'Turkish', category: 'Dessert', dietType: 'veg', tags: [],
    cookingTime: 60, servings: 12, calories: 380, protein: 6, carbs: 42, fat: 22,
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600',
    ingredients: [
      { name: 'Phyllo dough', amount: '400', unit: 'g' }, { name: 'Pistachios', amount: '200', unit: 'g' },
      { name: 'Butter', amount: '200', unit: 'g' }, { name: 'Sugar', amount: '200', unit: 'g' },
      { name: 'Honey', amount: '100', unit: 'ml' }, { name: 'Rose water', amount: '1', unit: 'tbsp' }
    ],
    steps: ['Layer buttered phyllo sheets in pan', 'Add crushed pistachio layer every 5 sheets', 'Cut into diamond shapes before baking', 'Bake at 175°C for 45 minutes', 'Make syrup with sugar, honey, and rose water', 'Pour hot syrup over baked baklava immediately'],
    rating: 4.8, reviews: 234
  },
  {
    id: '38', name: 'Fish Curry (Kerala)', nameTranslations: { ta: 'மீன் குழம்பு', hi: 'फिश करी', ml: 'മീൻ കറി' },
    cuisine: 'Indian', category: 'Main Course', dietType: 'non-veg', tags: ['Gluten Free', 'High Protein'],
    cookingTime: 35, servings: 4, calories: 350, protein: 28, carbs: 12, fat: 22,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600',
    ingredients: [
      { name: 'Fish (king fish)', amount: '500', unit: 'g' }, { name: 'Coconut milk', amount: '400', unit: 'ml' },
      { name: 'Kokum/tamarind', amount: '3', unit: 'pcs' }, { name: 'Green chilies', amount: '4', unit: 'pcs' },
      { name: 'Shallots', amount: '6', unit: 'medium' }, { name: 'Coconut oil', amount: '3', unit: 'tbsp' }
    ],
    steps: ['Sauté shallots in coconut oil', 'Add turmeric and chili powder', 'Pour thin coconut milk and bring to boil', 'Add fish pieces and kokum', 'Simmer gently for 10 minutes', 'Add thick coconut milk, do not boil after'],
    rating: 4.8, reviews: 167
  },
  {
    id: '39', name: 'Spring Rolls', nameTranslations: { ta: 'ஸ்பிரிங் ரோல்ஸ்', hi: 'स्प्रिंग रोल्स', ml: 'സ്പ്രിംഗ് റോൾസ്' },
    cuisine: 'Chinese', category: 'Appetizer', dietType: 'veg', tags: [],
    cookingTime: 30, servings: 6, calories: 220, protein: 6, carbs: 28, fat: 10,
    image: 'https://images.unsplash.com/photo-1548507709-6a1540b6ad6c?w=600',
    ingredients: [
      { name: 'Spring roll wrappers', amount: '12', unit: 'pcs' }, { name: 'Cabbage', amount: '2', unit: 'cups' },
      { name: 'Carrots', amount: '2', unit: 'medium' }, { name: 'Bean sprouts', amount: '100', unit: 'g' },
      { name: 'Soy sauce', amount: '2', unit: 'tbsp' }, { name: 'Oil', amount: '500', unit: 'ml' }
    ],
    steps: ['Shred vegetables finely', 'Stir-fry vegetables with soy sauce briefly', 'Cool the filling completely', 'Place filling on wrapper and roll tightly', 'Seal edges with flour paste', 'Deep fry until golden and crispy'],
    rating: 4.4, reviews: 198
  },
  {
    id: '40', name: 'Protein Pancakes', nameTranslations: { ta: 'புரோட்டீன் பான்கேக்', hi: 'प्रोटीन पैनकेक', ml: 'പ്രോട്ടീൻ പാൻകേക്ക്' },
    cuisine: 'American', category: 'Breakfast', dietType: 'veg', tags: ['High Protein', 'Keto'],
    cookingTime: 15, servings: 2, calories: 320, protein: 28, carbs: 24, fat: 12,
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600',
    ingredients: [
      { name: 'Protein powder', amount: '30', unit: 'g' }, { name: 'Oats', amount: '50', unit: 'g' },
      { name: 'Banana', amount: '1', unit: 'medium' }, { name: 'Eggs', amount: '2', unit: 'pcs' },
      { name: 'Almond milk', amount: '100', unit: 'ml' }, { name: 'Blueberries', amount: '50', unit: 'g' }
    ],
    steps: ['Blend oats into flour', 'Mix with protein powder, eggs, banana, and milk', 'Cook on medium heat until bubbles form', 'Flip and cook other side', 'Stack and top with blueberries and honey'],
    rating: 4.4, reviews: 156
  },
];

export const ingredientSubstitutions: Record<string, string[]> = {
  'Butter': ['Olive oil', 'Coconut oil', 'Applesauce', 'Avocado'],
  'Egg': ['Banana (mashed)', 'Flax egg', 'Yogurt', 'Applesauce'],
  'Sugar': ['Honey', 'Maple syrup', 'Stevia', 'Dates (pureed)'],
  'All-purpose flour': ['Almond flour', 'Coconut flour', 'Oat flour', 'Whole wheat flour'],
  'Cream': ['Coconut cream', 'Cashew cream', 'Silken tofu (blended)', 'Greek yogurt'],
  'Milk': ['Almond milk', 'Oat milk', 'Coconut milk', 'Soy milk'],
  'Soy sauce': ['Coconut aminos', 'Tamari', 'Worcestershire sauce'],
  'Cheese': ['Nutritional yeast', 'Cashew cheese', 'Tofu ricotta'],
  'Yogurt': ['Coconut yogurt', 'Soy yogurt', 'Silken tofu'],
  'Chicken': ['Tofu', 'Tempeh', 'Seitan', 'Jackfruit'],
};
