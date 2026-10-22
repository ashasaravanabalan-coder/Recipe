import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Local-only auth: accounts and the session live in this browser's localStorage.
// There is no server or database, so accounts exist only on this device.

export type Profile = {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  diet_type: string;
  fitness_goal: string;
  allergies: string[];
  medical_conditions: string[];
  preferred_language: string;
};

export type LocalUser = { id: string; email: string };

type StoredAccount = {
  id: string;
  email: string;
  salt: string;
  passwordHash: string;
  profile: Profile;
};

type AuthContextType = {
  user: LocalUser | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<{ error: string | null }>;
  refreshProfile: () => Promise<void>;
};

const USERS_KEY = 'plate-users';
const SESSION_KEY = 'plate-session';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const readAccounts = (): StoredAccount[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
};

const writeAccounts = (accounts: StoredAccount[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(accounts));
};

const newId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

// SHA-256 when available (needs https or localhost); simple fallback otherwise.
const hashPassword = async (password: string, salt: string): Promise<string> => {
  const text = `${salt}:${password}`;
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
  return `fallback-${h}`;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadSession = () => {
    const id = localStorage.getItem(SESSION_KEY);
    const account = id ? readAccounts().find(a => a.id === id) : undefined;
    if (account) {
      setUser({ id: account.id, email: account.email });
      setProfile(account.profile);
    } else {
      setUser(null);
      setProfile(null);
    }
  };

  useEffect(() => {
    loadSession();
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const accounts = readAccounts();
      if (accounts.some(a => a.email === cleanEmail)) {
        return { error: 'An account with this email already exists. Please sign in.' };
      }
      const id = newId();
      const salt = newId();
      const account: StoredAccount = {
        id,
        email: cleanEmail,
        salt,
        passwordHash: await hashPassword(password, salt),
        profile: {
          id: newId(),
          user_id: id,
          full_name: fullName.trim(),
          phone: phone.trim(),
          diet_type: 'non-veg',
          fitness_goal: 'maintain',
          allergies: [],
          medical_conditions: [],
          preferred_language: 'en',
        },
      };
      writeAccounts([...accounts, account]);
      localStorage.setItem(SESSION_KEY, id);
      loadSession();
      return { error: null };
    } catch {
      return { error: 'Could not save the account. Check that browser storage is enabled.' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const account = readAccounts().find(a => a.email === cleanEmail);
      if (!account) return { error: 'No account found with this email. Please sign up first.' };
      const hash = await hashPassword(password, account.salt);
      if (hash !== account.passwordHash) return { error: 'Incorrect password.' };
      localStorage.setItem(SESSION_KEY, account.id);
      loadSession();
      return { error: null };
    } catch {
      return { error: 'Login failed. Please try again.' };
    }
  };

  const signOut = async () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return { error: 'Not authenticated' };
    try {
      const accounts = readAccounts();
      const updated = accounts.map(a =>
        a.id === user.id ? { ...a, profile: { ...a.profile, ...data } } : a
      );
      writeAccounts(updated);
      loadSession();
      return { error: null };
    } catch {
      return { error: 'Could not save profile.' };
    }
  };

  const refreshProfile = async () => {
    loadSession();
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut, updateProfile, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
