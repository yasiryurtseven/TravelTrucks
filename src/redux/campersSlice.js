import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./operations";

const initialState = {
    items: [],
    total: 0,
    page: 1,
    isLoading: false,
    error: null,
    favorites: [],

};

const campersSlice = createSlice({
    name: "campers",
    initialState,
    reducers: {
          incrementPage: (state) => {
            state.page += 1;
          },
          resetCampers: (state) => {
            state.items = [];
            state.page = 1;
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
            const newItems = action.payload.items || [];
            state.total = action.payload.total || 0;

            if (state.page === 1) {
            state.items = newItems;
            } else {
            // Sayfa 1'den büyükse eskilerin sonuna ekle
            state.items = [...state.items, ...newItems];
            }
        })
        .addCase(fetchCampers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            });
    }
});

export const { incrementPage, resetCampers } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
