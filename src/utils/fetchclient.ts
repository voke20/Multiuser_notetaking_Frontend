import useAuthStore from "../store/authstore";


const BASE_URL = 'http://localhost:8000';
const fetchclient = async (endpoint: string, options: RequestInit = {}) => {
    const { accessToken } = useAuthStore.getState();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: 'Bearer ${accesstoken}' }),
        ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    });

    const data = await response.json();
     
    if (!response.ok) {
        throw new Error(data.Message || 'Something went wrong');
    }

    return data;
};

export default fetchclient;