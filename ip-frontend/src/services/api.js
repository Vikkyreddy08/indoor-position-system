import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictLocation = async (sensorData) => {
  try {
    const response = await api.post('/predict-location/', sensorData);
    return response.data;
  } catch (error) {
    console.error('Error predicting location:', error);
    throw error;
  }
};

export default api;
