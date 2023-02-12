import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '@/redux/slices/themeSlice';

import { moon, sun } from '@/utils/icons';

const ThemeToogler = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);

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