import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IUISliceState {
    menuOpened: boolean;
}

const initialState: IUISliceState = {
    menuOpened: false,
};

const UISlice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        setMenuToggle(state, action: PayloadAction<boolean>) {
            state.menuOpened = action.payload;
        },
    }
});

export const selectUIMenu = ((state: RootState) => state.UI);

export const { setMenuToggle } = UISlice.actions;
export default UISlice.reducer;