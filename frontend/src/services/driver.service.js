import api from '../lib/axios';

export const driverService = {
  getAllDrivers: async () => {
    const response = await api.get('/drivers');
    return response.data;
  },
  createDriver: async (data) => {
    const response = await api.post('/drivers', data);
    return response.data;
  }
};
