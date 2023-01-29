import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuOpened: false,
};

const UISlice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        setMenuToggle(state, action) {
            state.menuOpened = action.payload;
        },
    }
});

export const { setMenuToggle } = UISlice.actions;
export default UISlice.reducer;