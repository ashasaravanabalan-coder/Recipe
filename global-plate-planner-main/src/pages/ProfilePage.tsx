import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Heart, Target, AlertTriangle, Save, Loader2, LogOut, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const dietOptions = ['non-veg', 'veg', 'vegan', 'keto', 'paleo'];
const goalOptions = ['maintain', 'weight-loss', 'muscle-gain', 'diabetic-friendly'];
const conditionOptions = ['diabetes', 'low-bp', 'high-bp', 'cholesterol', 'thyroid', 'pcod'];
const allergyOptions = ['gluten', 'dairy', 'nuts', 'shellfish', 'soy', 'eggs'];

const ProfilePage = () => {
  const { user, profile, loading, signOut, updateProfile } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    diet_type: 'non-veg',
    fitness_goal: 'maintain',
    allergies: [] as string[],
    medical_conditions: [] as string[],
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        diet_type: profile.diet_type || 'non-veg',
        fitness_goal: profile.fitness_goal || 'maintain',
        allergies: profile.allergies || [],
        medical_conditions: profile.medical_conditions || [],
      });
    }
  }, [profile]);

  const toggleArray = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter(a => a !== item) : [...arr, item];

  const handleSave = async () => {
    setSaving(true);
    const { error } = await updateProfile(form);
    if (error) {
      toast({ title: 'Error', description: error, variant: 'destructive' });
    } else {
      toast({ title: 'Profile Updated', description: 'Your preferences have been saved.' });
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">My Profile</h1>
          <p className="mt-1 text-muted-foreground">{user.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
            <User className="h-5 w-5 text-primary" />
            Basic Information
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name</label>
              <input
                type="text"
                value={form.full_name}
                onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Diet Preference */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
            <Heart className="h-5 w-5 text-primary" />
            Diet Preference
          </h2>
          <div className="flex flex-wrap gap-2">
            {dietOptions.map(d => (
              <button
                key={d}
                onClick={() => setForm(f => ({ ...f, diet_type: d }))}
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  form.diet_type === d
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {d.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Fitness Goal */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
            <Target className="h-5 w-5 text-primary" />
            Fitness Goal
          </h2>
          <div className="flex flex-wrap gap-2">
            {goalOptions.map(g => (
              <button
                key={g}
                onClick={() => setForm(f => ({ ...f, fitness_goal: g }))}
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  form.fitness_goal === g
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {g.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Medical Conditions */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
            <Shield className="h-5 w-5 text-primary" />
            Medical Conditions
          </h2>
          <div className="flex flex-wrap gap-2">
            {conditionOptions.map(c => (
              <button
                key={c}
                onClick={() => setForm(f => ({ ...f, medical_conditions: toggleArray(f.medical_conditions, c) }))}
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  form.medical_conditions.includes(c)
                    ? 'bg-destructive/20 text-destructive'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {c.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Allergies
          </h2>
          <div className="flex flex-wrap gap-2">
            {allergyOptions.map(a => (
              <button
                key={a}
                onClick={() => setForm(f => ({ ...f, allergies: toggleArray(f.allergies, a) }))}
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  form.allergies.includes(a)
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
