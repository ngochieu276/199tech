import axios from 'axios';

const API_URL = 'http://localhost:3000/api/resources';

export interface Resource {
  id: number;
  name: string;
  description?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export type CreateResourceDTO = Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateResourceDTO = Partial<CreateResourceDTO>;
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const resourceService = {
  getAll: async (params?: { status?: string; name?: string; page?: number; limit?: number }) => {
    const response = await axios.get<{ status: string; data: Resource[]; meta: PaginationMeta }>(API_URL, { params });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axios.get<{ status: string; data: Resource }>(`${API_URL}/${id}`);
    return response.data.data;
  },

  create: async (data: CreateResourceDTO) => {
    const response = await axios.post<{ status: string; data: Resource }>(API_URL, data);
    return response.data.data;
  },

  update: async (id: number, data: UpdateResourceDTO) => {
    const response = await axios.patch<{ status: string; data: Resource }>(`${API_URL}/${id}`, data);
    return response.data.data;
  },

  delete: async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
