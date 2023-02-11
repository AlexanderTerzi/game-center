import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

import { API_URL } from "@/utils/API_URL";
import { API_KEY } from "../../config";

export const fetchUpcomingGames = createAsyncThunk(
    'upcomingGames/fetchUpcomingGames',
    async (params, thunkAPI) => {
        const { perPage } = params;

        const res = await axios.get(
            `${API_URL}?key=${API_KEY}&dates=2022-09-01,2023-12-10&ordering=-added&page_size=${perPage}`
        );

        return thunkAPI.fulfillWithValue(res.data);
    }
)

const initialState = {
    upcomingGames: [],
    perPage: 9,
    status: 'loading', //  loading || success || error
};

const upcomingGamesSlice = createSlice({
    name: 'upcomingGames',
    initialState,
    reducers: {
        setPerPage(state, action) {
            state.perPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUpcomingGames.pending, (state) => {
            state.status = 'loading';
            state.upcomingGames = [];
        });
        builder.addCase(fetchUpcomingGames.fulfilled, (state, action) => {
            state.upcomingGames = action.payload.results;
            state.status = 'success';
        });
        builder.addCase(fetchUpcomingGames.rejected, (state) => {
            state.status = 'error';
            state.upcomingGames = [];
        });
    }
});

export const { setPerPage } = upcomingGamesSlice.actions;
export default upcomingGamesSlice.reducer;