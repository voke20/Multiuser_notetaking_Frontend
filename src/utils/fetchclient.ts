import useAuthStore from "../store/authstore";


const BASE_URL = 'http://localhost:8000';
const fetchclient = async (endpoint: string, options: RequestInit = {}) => {
    const { accessToken } = useAuthStore.getState();

    // const headers: HeadersInit = {
    //     'Content-Type': 'application/json',
    //     ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    //     ...options.headers,
    // };
    const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(options.headers || {}),
    },
    });

      // Handle empty responses (like DELETE)
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    
     
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
};

export default fetchclient;