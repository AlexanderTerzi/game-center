import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

import { API_URL } from "../../utils/API_URL";
import { API_KEY } from "../../config";
import { Status } from "../enumStatus";
import { RootState } from "../store";

type fetchUpcomingGamesType = {
    perPage: number | undefined;
}

interface IUpcomingGamesSliceState {
    upcomingGames?: any;
    perPage?: number;
    status: Status;
}

export const fetchUpcomingGames = createAsyncThunk(
    'upcomingGames/fetchUpcomingGames',
    async (params: fetchUpcomingGamesType, thunkAPI) => {
        const { perPage } = params;

        const res = await axios.get(
            `${API_URL}?key=${API_KEY}&dates=2022-09-01,2023-12-10&ordering=-added&page_size=${perPage}`
        );

        return thunkAPI.fulfillWithValue(res.data);
    }
)

const initialState: IUpcomingGamesSliceState = {
    upcomingGames: [],
    perPage: 9,
    status: Status.LOADING,
};

const upcomingGamesSlice = createSlice({
    name: 'upcomingGames',
    initialState,
    reducers: {
        setPerPage(state, action: PayloadAction<number>) {
            state.perPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUpcomingGames.pending, (state) => {
            state.status = Status.LOADING;
            state.upcomingGames = [];
        });
        builder.addCase(fetchUpcomingGames.fulfilled, (state, action) => {
            state.upcomingGames = action.payload.results;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchUpcomingGames.rejected, (state) => {
            state.status = Status.ERROR;
            state.upcomingGames = [];
        });
    }
});

export const selectUpcomingGames = ((state: RootState) => state.upcomingGames);

export const { setPerPage } = upcomingGamesSlice.actions;
export default upcomingGamesSlice.reducer;