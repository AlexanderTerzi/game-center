import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './slices/themeSlice';
import UISlice from './slices/UISlice';

export const store = configureStore({
    reducer: {
        theme: themeSlice,
        UI: UISlice
    },
});