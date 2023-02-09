import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

import { API_URL } from "@/utils/API_URL";
import { API_KEY } from "../../config";

export const fetchSingleGame = createAsyncThunk(
    'game/fetchSingleGame',
    async (params, thunkAPI) => {
        const { id } = params;

        const res = await axios.get(
            `${API_URL}/${id}?key=${API_KEY}`
        );

        return thunkAPI.fulfillWithValue(res.data);
    }
)

const initialState = {
    game: {
        platforms: [],
        genres: []
    },
    game_ID: null,
    openModal: false,
    status: 'loading', //  loading || success || error
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
            state.status = 'loading';
            state.game = [];
        });
        builder.addCase(fetchSingleGame.fulfilled, (state, action) => {
            state.game = action.payload;
            state.status = 'success';
        });
        builder.addCase(fetchSingleGame.rejected, (state) => {
            state.status = 'error';
            state.game = [];
        });
    }
});

export const { setOpenModal } = singleGameSlice.actions;
export default singleGameSlice.reducer;