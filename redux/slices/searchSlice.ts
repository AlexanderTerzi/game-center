import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
    searchQuery: '',
    status: 'loading', //  loading || success || error
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
    }
});

export const selectSearch = ((state: RootState) => state.search);

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;