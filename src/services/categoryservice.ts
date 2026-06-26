import apiClient from '../utils/fetchclient';

export const GetCategories = async () => {
  return await apiClient('/api/notes/categories/', { method: 'GET' });
};

export const CreateCategory = async (data: {
  name: string;
  description?: string;
}) => {
  return await apiClient('/api/notes/categories/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const UpdateCategory = async (id: number, data: {
  name?: string;
  description?: string;
}) => {
  return await apiClient(`/api/notes/categories/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export const DeleteCategory = async (id: number) => {
  return await apiClient(`/api/notes/categories/${id}/`, { method: 'DELETE' });
};