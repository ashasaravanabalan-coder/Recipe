 Global Plate Planner

Personalized Global Meal Planning & Food Discovery Platform

**Global Plate Planner** is a web-based meal planning application designed to help users discover, organize, and plan meals inspired by cuisines from around the world.

The platform provides an interactive and user-friendly experience for exploring global dishes and creating personalized meal plans based on individual preferences.

---

 Features

*  Explore cuisines and dishes from around the world
*  Discover different meal options
*  Plan meals for different days
*  Save and manage favorite meals
*  Search and explore food options
*  Personalized user experience
*  Responsive design for desktop and mobile
*  Modern and intuitive user interface
*  Fast client-side application powered by Vite
*  Supabase integration for backend/database functionality

---

 Project Objective

The main objective of Global Plate Planner is to make meal planning **simple, personalized, and culturally diverse**.

Instead of repeatedly deciding what to cook or eat, users can explore dishes from different cuisines and organize them into a structured meal plan.

The application focuses on combining:

**Food Discovery → Personal Preferences → Meal Planning → Organized Schedule**

---

##  Application Architecture

```text
                    ┌──────────────────────┐
                    │        User          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │                      │
                    │  • Meal Discovery    │
                    │  • Search            │
                    │  • Meal Planning     │
                    │  • Favorites         │
                    │  • User Interface    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Supabase       │
                    │                      │
                    │  • Database          │
                    │  • Authentication    │
                    │  • Backend Services  │
                    └──────────────────────┘
```

---

##  Tech Stack

### Frontend

* **React**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **shadcn/ui**

### Backend / Database

* **Supabase**

### Development Tools

* ESLint
* Vitest
* npm
* Git & GitHub

The repository's current project configuration confirms the use of Vite, TypeScript, React, shadcn/ui and Tailwind CSS, with localStorage-based data.

---

##  Project Structure

```text
global-plate-planner-main/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   └── ...
│
├── supabase/
│
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── README.md
```

---

##  Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/ashasaravanabalan-coder/global-plate-planner-main.git
```

### 2. Navigate to the Project

```bash
cd global-plate-planner-main
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure the AI chatbot (optional)

Accounts, favorites and meal plans are stored in your browser (no database needed).
Only the Chef AI chatbot needs a key. Put it in `.env`:

```
AI_API_KEY=your_key
AI_API_URL=https://generativelanguage.googleapis.com/v1beta/openai/chat/completions
AI_MODEL=gemini-2.0-flash
```

Never commit a real key to GitHub.

### 5. Run the Development Server

```bash
npm run dev
```

The application will start using the Vite development server.

---

##  Testing

The project includes Vitest configuration for testing.

Run tests using:

```bash
npm run test
```

---

##  Application Screenshots

Add screenshots of the application here to make the GitHub repository more attractive.

```text
screenshots/
├── home.png
├── meal-discovery.png
├── meal-planner.png
└── profile.png
```

## 💡 Use Cases

Global Plate Planner can be useful for:

*  Students planning weekly meals
*  Families organizing meals
*  People interested in international cuisines
*  Users following dietary preferences
*  Home cooks looking for new recipes
*  Users who want structured weekly meal plans

---

##  Project Highlights

### Modern Frontend

Built with **React + TypeScript + Vite** for a fast and maintainable frontend.

### Responsive UI

Tailwind CSS and shadcn/ui are used to create a clean and responsive user interface.

### Cloud Backend

Accounts and data are stored in the browser's localStorage. The chatbot talks to an AI API through a small built-in `/api/chat` route in the Vite server.

### Scalable Architecture

The project structure separates UI components, application logic, configuration and backend-related functionality, making it easier to extend in the future.

---



## ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub.

**Built with ❤️ using React, TypeScript, Vite, Tailwind CSS and Supabase.**
