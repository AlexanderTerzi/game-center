import { RootState } from './../store';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

import { API_URL } from "../../utils/API_URL";
import { API_KEY } from "../../config";
import { Status } from "../enumStatus";

type fetchGamesType = {
    perPage: string | number;
    searchQuery: string;
}

interface IGamesSliceState {
    games?: any;
    perPage: string | number;
    status: Status;
}

export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async (params: fetchGamesType, thunkAPI) => {
        const { perPage, searchQuery } = params;

        const res = await axios.get(
            `${API_URL}?key=${API_KEY}&page_size=${perPage}&search=${searchQuery}`
        );

        return thunkAPI.fulfillWithValue(res.data);
    }
)

const initialState: IGamesSliceState = {
    games: [],
    perPage: 12,
    status: Status.LOADING,
};

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setPerPage(state, action: PayloadAction<string | number>) {
            state.perPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGames.pending, (state) => {
            state.status = Status.LOADING;
            state.games = [];
        });
        builder.addCase(fetchGames.fulfilled, (state, action: PayloadAction<any>) => {
            state.games = action.payload.results;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchGames.rejected, (state) => {
            state.status = Status.ERROR;
            state.games = [];
        });
    }
});

export const selectGames = ((state: RootState) => state.games);

export const { setPerPage } = gamesSlice.actions;
export default gamesSlice.reducer;