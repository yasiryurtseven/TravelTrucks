import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../services/api";

export const fetchCampers = createAsyncThunk(
    "campers/fetchAll",
    async ({page = 1, limit = 4 } = {}, thunkAPI) => {
        try {
            const response = await api.get(`/campers?page=${page}&limit=${limit}`);
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)