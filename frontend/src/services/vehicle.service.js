import api from '../lib/axios';

export const vehicleService = {
  getVehicles: async () => {
    const response = await api.get('/vehicles');
    return response.data;
  },
  getVehicle: async (id) => {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  },
  createVehicle: async (data) => {
    const response = await api.post('/vehicles', data);
    return response.data;
  },
  updateVehicle: async (id, data) => {
    const response = await api.put(`/vehicles/${id}`, data);
    return response.data;
  },
  deleteVehicle: async (id) => {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
  }
};
