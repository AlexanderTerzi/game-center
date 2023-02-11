import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

import { API_URL } from "@/utils/API_URL";
import { API_KEY } from "../../config";

export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async (params, thunkAPI) => {
        const { perPage, searchQuery } = params;

        const res = await axios.get(
            `${API_URL}?key=${API_KEY}&page_size=${perPage}&search=${searchQuery}`
        );

        return thunkAPI.fulfillWithValue(res.data);
    }
)

const initialState = {
    games: [],
    perPage: 12,
    status: 'loading', //  loading || success || error
};

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setPerPage(state, action) {
            state.perPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGames.pending, (state) => {
            state.status = 'loading';
            state.games = [];
        });
        builder.addCase(fetchGames.fulfilled, (state, action) => {
            state.games = action.payload.results;
            state.status = 'success';
        });
        builder.addCase(fetchGames.rejected, (state) => {
            state.status = 'error';
            state.games = [];
        });
    }
});

export const { setPerPage } = gamesSlice.actions;
export default gamesSlice.reducer;