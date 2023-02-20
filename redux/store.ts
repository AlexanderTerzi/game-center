import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import gamesSlice from './slices/gamesSlice';
import popularGamesSlice from './slices/popularGamesSlice';
import searchSlice from './slices/searchSlice';
import singleGameSlice from './slices/singleGameSlice';
import themeSlice from './slices/themeSlice';
import UISlice from './slices/UISlice';
import upcomingGamesSlice from './slices/upcomingGamesSlice';

export const store = configureStore({
    reducer: {
        theme: themeSlice,
        UI: UISlice,
        games: gamesSlice,
        singleGame: singleGameSlice,
        popularGames: popularGamesSlice,
        upcomingGames: upcomingGamesSlice,
        search: searchSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();