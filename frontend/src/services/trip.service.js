import api from '../lib/axios';

export const tripService = {
  getAllTrips: async () => {
    const response = await api.get('/trips');
    return response.data;
  },
  createTrip: async (data) => {
    const response = await api.post('/trips', data);
    return response.data;
  }
};
