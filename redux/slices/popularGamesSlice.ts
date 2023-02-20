import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

import { API_URL } from "../../utils/API_URL";
import { API_KEY } from "../../config";
import { Status } from "../enumStatus";
import { RootState } from "../store";

type fetchPopularGamesType = {
    perPage: number | undefined;
}

interface IPopularGamesSliceState {
    popularGames?: any;
    perPage?: number;
    status: Status;
}

export const fetchPopularGames = createAsyncThunk(
    'popularGames/fetchPopularGames',
    async (params: fetchPopularGamesType, thunkAPI) => {
        const { perPage } = params;

        const res = await axios.get(
            `${API_URL}?key=${API_KEY}&page_size=${perPage}&dates=2011-09-01,2021-12-10&ordering=-rating`
        );

        return thunkAPI.fulfillWithValue(res.data);
    }
)

const initialState: IPopularGamesSliceState = {
    popularGames: [],
    perPage: 9,
    status: Status.LOADING, //  loading || success || error
};

const popularGamesSlice = createSlice({
    name: 'popularGames',
    initialState,
    reducers: {
        setPerPage(state, action: PayloadAction<number>) {
            state.perPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPopularGames.pending, (state) => {
            state.status = Status.LOADING;
            state.popularGames = [];
        });
        builder.addCase(fetchPopularGames.fulfilled, (state, action) => {
            state.popularGames = action.payload.results;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPopularGames.rejected, (state) => {
            state.status = Status.ERROR;
            state.popularGames = [];
        });
    }
});

export const selectPopularGames = ((state: RootState) => state.popularGames);

export const { setPerPage } = popularGamesSlice.actions;
export default popularGamesSlice.reducer;