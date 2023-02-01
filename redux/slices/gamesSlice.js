import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

import { API_KEY } from "../../config";
const gamesBaseURL = `https://api.rawg.io/api/games?key=${API_KEY}`;

export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async (params, thunkAPI) => {
        const { perPage } = params;

        const res = await axios.get(
            `${gamesBaseURL}&page_size=${perPage}`
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