import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState } from '../Type/authtype';

const useAuthStore = create<AuthState>() (
    persist(
        (set, get) => ({
            accessToken: null,
            refreshToken: null,

            setTokens: (access, refresh) => {
                set({ accessToken: access, refreshToken: refresh});
            },
            clearTokens: () => {
                set({accessToken: null, refreshToken: null})
            },
            isAuthenticated: () => {
                return get().accessToken !== null;
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
export default useAuthStore;