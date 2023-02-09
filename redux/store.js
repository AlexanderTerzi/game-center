import { configureStore } from '@reduxjs/toolkit';
import gamesSlice from './slices/gamesSlice';
import singleGameSlice from './slices/singleGameSlice';
import themeSlice from './slices/themeSlice';
import UISlice from './slices/UISlice';

export const store = configureStore({
    reducer: {
        theme: themeSlice,
        UI: UISlice,
        games: gamesSlice,
        singleGame: singleGameSlice
    },
});