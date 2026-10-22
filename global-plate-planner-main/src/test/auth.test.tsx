import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;

describe('local auth', () => {
  beforeEach(() => localStorage.clear());

  it('signs up, signs out, rejects wrong password, then signs in', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));

    let r = await act(() => result.current.signUp('A@b.com', 'secret1', 'Asha', '+91 9876543210'));
    expect(r.error).toBeNull();
    await waitFor(() => expect(result.current.user?.email).toBe('a@b.com'));
    expect(result.current.profile?.phone).toBe('+91 9876543210');

    r = await act(() => result.current.signUp('a@b.com', 'secret1', 'Asha', '+91 9876543210'));
    expect(r.error).toMatch(/already exists/);

    await act(() => result.current.signOut());
    expect(result.current.user).toBeNull();

    r = await act(() => result.current.signIn('a@b.com', 'wrong'));
    expect(r.error).toMatch(/Incorrect/);
    r = await act(() => result.current.signIn('a@b.com', 'secret1'));
    expect(r.error).toBeNull();
    await waitFor(() => expect(result.current.user?.email).toBe('a@b.com'));

    await act(() => result.current.updateProfile({ diet_type: 'veg' }));
    await waitFor(() => expect(result.current.profile?.diet_type).toBe('veg'));
  });
});
