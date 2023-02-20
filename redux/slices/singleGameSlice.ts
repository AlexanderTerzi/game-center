import { Status } from './../enumStatus';
import { RootState } from './../store';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

import { API_URL } from "../../utils/API_URL";
import { API_KEY } from "../../config";

type fetchSingleGameType = {
    id: number;
}

interface ISingleGameSliceState {
    game: any;
    game_ID: number | null;
    openModal: boolean;
    status: Status;
}

export const fetchSingleGame = createAsyncThunk(
    'game/fetchSingleGame',
    async (params: fetchSingleGameType, thunkAPI) => {
        const { id } = params;

        const res = await axios.get(
            `${API_URL}/${id}?key=${API_KEY}`
        );

        return thunkAPI.fulfillWithValue(res.data);
    }
)

const initialState: ISingleGameSliceState = {
    game: {},
    game_ID: null,
    openModal: false,
    status: Status.LOADING, //  loading || success || error
};

const singleGameSlice = createSlice({
    name: 'singleGame',
    initialState,
    reducers: {
        setOpenModal(state, action) {
            state.openModal = !state.openModal;
            state.game_ID = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSingleGame.pending, (state) => {
            state.status = Status.LOADING;
            state.game = {};
        });
        builder.addCase(fetchSingleGame.fulfilled, (state, action) => {
            state.game = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchSingleGame.rejected, (state) => {
            state.status = Status.ERROR;
            state.game = {};
        });
    }
});

export const selectSingleGame = ((state: RootState) => state.singleGame);

export const { setOpenModal } = singleGameSlice.actions;
export default singleGameSlice.reducer;