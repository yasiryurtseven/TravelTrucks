import { createSlice } from '@reduxjs/toolkit';
import { fetchCampers, fetchCamperById } from './operations';

const loadFavoritesFromStorage = () => {
  try {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialFiltersState = {
  location: '',
  form: '',
  engine: '',
  transmission: '',
  AC: false,
  kitchen: false,
  TV: false,
  bathroom: false,
};

const initialState = {
  items: [],
  total: 0,
  page: 1,
  isLoading: false,
  error: null,
  currentCamper: null,
  favorites: loadFavoritesFromStorage(),
  filters: initialFiltersState,
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    resetCampers: (state) => {
      state.items = [];
      state.page = 1;
    },
    clearCurrentCamper: (state) => {
      state.currentCamper = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialFiltersState;
    },
    toggleFavorite: (state, action) => {
      const camperId = action.payload;
      const index = state.favorites.indexOf(camperId);

      if (index === -1) {
        state.favorites.push(camperId);
      } else {
        state.favorites.splice(index, 1);
      }

      try {
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      } catch (err) {
        console.error('Favorites storage error:', err);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;

        let newItems = [];
        let totalCount = 0;

        if (Array.isArray(action.payload)) {
          newItems = action.payload;
          totalCount = action.payload.length;
        } else if (action.payload && Array.isArray(action.payload.items)) {
          newItems = action.payload.items;
          totalCount = action.payload.total ?? newItems.length;
        }

        state.total = totalCount;

        if (state.page === 1) {
          state.items = newItems;
        } else {
          state.items = [...state.items, ...newItems];
        }
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  incrementPage,
  resetCampers,
  clearCurrentCamper,
  setFilters,
  resetFilters,
  toggleFavorite,
} = campersSlice.actions;

export const campersReducer = campersSlice.reducer;