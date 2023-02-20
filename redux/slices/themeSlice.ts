import { RootState } from './../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IThemeSliceState {
    theme: number;
}

const initialState: IThemeSliceState = {
    theme: 0,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<number>) {
            state.theme = action.payload;
        },
    }
});

export const selectTheme = ((state: RootState) => state.theme);

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;