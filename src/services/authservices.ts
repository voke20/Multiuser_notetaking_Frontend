import fetchclient from "../utils/fetchclient";
import type { LoginCredentials, RegisterCredentials,AuthResponse } from "../Type/authtype";

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const data = await fetchclient('/api/auth/login/', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
    return data;
};

export const registerUser = async(credentials: RegisterCredentials) => {
    const data = await fetchclient('/api/auth/register/', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
    return data;
};

export const logoutUser = async (refreshToken: string) => {
    const data = fetchclient('/api/auth/logout/', {
        method: 'POST',
        body: JSON.stringify({refresh: refreshToken}),
    });
    return data;
};

