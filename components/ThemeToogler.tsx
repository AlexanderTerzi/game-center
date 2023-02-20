import React from 'react';

import { useSelector } from 'react-redux';
import { selectTheme, setTheme } from '../redux/slices/themeSlice';
import { useAppDispatch } from '../redux/store';

import { moon, sun } from '../utils/icons';

const ThemeToogler: React.FC = () => {
    const dispatch = useAppDispatch();
    const { theme } = useSelector(selectTheme);

    const handleClickTheme = () => {
        const newTheme = theme === 0 ? 1 : 0;
        dispatch(setTheme(newTheme));
    };

    return (
        <>
            <button
                className='user-button'
                onClick={handleClickTheme}
            >
                {theme === 0 ? moon : sun}
            </button>
        </>
    );
};

export default ThemeToogler;