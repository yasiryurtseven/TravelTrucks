import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';

export const fetchCampers = createAsyncThunk(
  'campers/fetchAll',
  async ({ page = 1, limit = 4, filters = {} } = {}, thunkAPI) => {
    try {
      const params = new URLSearchParams({
        page,
        limit,
      });

      // Metin ve seçim filtreleri
      if (filters.location?.trim()) {
        params.append('location', filters.location.trim());
      }
      if (filters.form) {
        params.append('form', filters.form);
      }
      if (filters.engine) {
        params.append('engine', filters.engine);
      }
      if (filters.transmission) {
        params.append('transmission', filters.transmission);
      }

      // Çoklu seçim boolean filtreler (Backend entegrasyonu)
      const booleanFeatures = [
        'AC',
        'kitchen',
        'bathroom',
        'TV',
        'radio',
        'refrigerator',
        'microwave',
        'gas',
        'water',
      ];

      booleanFeatures.forEach((feature) => {
        if (filters[feature]) {
          params.append(feature, 'true');
        }
      });

      const response = await api.get(`/campers?${params.toString()}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return { items: [], total: 0 };
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  'campers/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/campers/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);