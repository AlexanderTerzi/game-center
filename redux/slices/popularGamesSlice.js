import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

import { API_URL } from "@/utils/API_URL";
import { API_KEY } from "../../config";

export const fetchPopularGames = createAsyncThunk(
    'popularGames/fetchPopularGames',
    async (params, thunkAPI) => {
        const { perPage } = params;

        const res = await axios.get(
            `${API_URL}?key=${API_KEY}&page_size=${perPage}&dates=2011-09-01,2021-12-10&ordering=-rating`
        );

        return thunkAPI.fulfillWithValue(res.data);
    }
)

const initialState = {
    popularGames: [],
    perPage: 9,
    status: 'loading', //  loading || success || error
};

const popularGamesSlice = createSlice({
    name: 'popularGames',
    initialState,
    reducers: {
        setPerPage(state, action) {
            state.perPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPopularGames.pending, (state) => {
            state.status = 'loading';
            state.popularGames = [];
        });
        builder.addCase(fetchPopularGames.fulfilled, (state, action) => {
            state.popularGames = action.payload.results;
            state.status = 'success';
        });
        builder.addCase(fetchPopularGames.rejected, (state) => {
            state.status = 'error';
            state.popularGames = [];
        });
    }
});

export const { setPerPage } = popularGamesSlice.actions;
export default popularGamesSlice.reducer;