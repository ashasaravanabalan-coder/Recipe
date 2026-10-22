import type { IncomingMessage, ServerResponse } from 'node:http';

type Env = Record<string, string>;

const languageMap: Record<string, string> = {
  en: 'English',
  ta: 'Tamil (தமிழ்)',
  hi: 'Hindi (हिन्दी)',
  ml: 'Malayalam (മലയാളം)',
};

const readBody = (req: IncomingMessage): Promise<string> =>
  new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });

const sendJson = (res: ServerResponse, status: number, body: unknown) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
};

const buildPrompt = (language: string, userProfile: Record<string, unknown> | null) => {
  const lang = languageMap[language] || 'English';
  let profileContext = '';
  if (userProfile) {
    const parts: string[] = [];
    const list = (v: unknown) => (Array.isArray(v) ? v.join(', ') : '');
    if (userProfile.diet_type) parts.push(`Diet: ${userProfile.diet_type}`);
    if (userProfile.fitness_goal) parts.push(`Goal: ${userProfile.fitness_goal}`);
    if (list(userProfile.allergies)) parts.push(`Allergies: ${list(userProfile.allergies)}`);
    if (list(userProfile.medical_conditions)) parts.push(`Medical conditions: ${list(userProfile.medical_conditions)}`);
    if (parts.length) profileContext = `\n\nUSER PROFILE:\n${parts.join('\n')}`;
  }
  return `You are a friendly, expert chef assistant called "Chef AI". You MUST respond in ${lang}.
${profileContext}

CORE CAPABILITIES:
1. **Recipe Generation**: When asked for a recipe, provide:
   - Recipe Name
   - Short description
   - Ingredients list with quantities
   - Per-ingredient calorie breakdown in a table (Ingredient | Quantity | Calories)
   - Total Calories and Calories per Serving
   - Protein, Carbs, Fat breakdown
   - Diet labels (High Protein, Low Carb, Weight Loss Friendly, etc.)
   - Step-by-step detailed cooking instructions
   - Cooking Time and Serving Size
   - Tips and common mistakes to avoid

2. **Ingredient Substitution**: When user asks about replacing an ingredient, suggest 3-5 alternatives with explanations.

3. **Personalized Suggestions**: Adapt recipes based on user profile (diet type, fitness goal, allergies, medical conditions).

4. **Quick Suggestions**: Handle queries like "5 minutes recipe", "healthy dinner", "kids snack" with proper suggestions.

5. **Nutrition Info**: Always calculate approximate calories. Show per-ingredient calories when generating recipes.

6. **Serving Adjustment**: When user changes servings, multiply all ingredient quantities and nutrition proportionally.

MEDICAL FILTER RULES:
- If user has diabetes: avoid high sugar foods, recommend low GI, high fiber options.
- If user has low BP: include hydration tips, adequate salt, potassium-rich foods.
- If user has high BP: recommend low sodium options.
- NEVER recommend food that could harm the user based on their medical conditions.

FOOD RESEARCH: When user asks about a food, include origin country, history, how it's usually eaten, and popular variations.

GLOBAL DATABASE: You can recommend foods from any country including street food, traditional dishes, drinks, desserts, breakfast/lunch/dinner items.

RULES:
- Always be friendly and encouraging like a cooking mentor
- Provide step-by-step instructions with numbered steps
- If user asks in ${lang}, respond in ${lang}
- Provide cooking tips and mistakes to avoid
- Use markdown formatting for better readability
- Use tables for ingredient calories when generating full recipes
- Always mention approximate total calories and per-serving calories
- If unsure about something, ask short clarifying questions`;
};

export const createChatHandler = (env: Env) => async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  const apiKey = (env.AI_API_KEY || '').trim();
  if (!apiKey) {
    return sendJson(res, 500, {
      error: 'AI_API_KEY is missing. Add it to the .env file and restart npm run dev.',
    });
  }
  let apiUrl = (env.AI_API_URL || 'https://api.openai.com/v1/chat/completions').trim().replace(/^["']|["']$/g, '');
  // Be forgiving: add the missing path if only the base URL was given
  if (!/\/chat\/completions\/?$/.test(apiUrl)) apiUrl = apiUrl.replace(/\/+$/, '') + '/chat/completions';
  const model = (env.AI_MODEL || 'gpt-4o-mini').trim().replace(/^["']|["']$/g, '');

  try {
    const { messages, language, userProfile } = JSON.parse(await readBody(req));
    const upstream = await fetch(apiUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: buildPrompt(language, userProfile) }, ...messages],
        stream: true,
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const text = await upstream.text().catch(() => '');
      console.error('AI error:', upstream.status, text);
      if (upstream.status === 429) return sendJson(res, 429, { error: 'Rate limit exceeded. Please try again later.' });
      if (upstream.status === 401 || upstream.status === 403) return sendJson(res, 500, { error: 'AI_API_KEY was rejected. Check the key in .env.' });
      if (upstream.status === 402) return sendJson(res, 402, { error: 'AI credits exhausted.' });
      if (upstream.status === 404) {
        return sendJson(res, 500, {
          error: `404 Not Found from ${apiUrl} (model: ${model}). Check AI_API_URL and AI_MODEL in .env. Details: ${text.slice(0, 200)}`,
        });
      }
      return sendJson(res, 500, { error: `AI service error (${upstream.status})` });
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    const reader = upstream.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
    res.end();
  } catch (e) {
    console.error('chat error:', e);
    if (!res.headersSent) sendJson(res, 500, { error: e instanceof Error ? e.message : 'Unknown error' });
    else res.end();
  }
};