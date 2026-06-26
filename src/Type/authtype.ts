export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    email: string | null;
    setTokens: (access: string, refresh: string, email: string) => void;
    clearTokens: () => void;
    isAuthenticated: () => boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    phone_number?: string;
}

export interface AuthResponse {
    access: string;
    refresh: string;
}