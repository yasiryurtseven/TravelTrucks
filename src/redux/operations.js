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

      // Dolu olan filtreleri parametrelere ekle
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

      const response = await api.get(`/campers?${params.toString()}`);
      return response.data;
    } catch (error) {
      // MockAPI sonuç bulamayınca 404 atar; bunu çökme değil boş sonuç kabul ediyoruz:
      if (error.response && error.response.status === 404) {
        return { items: [], total: 0 };
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);