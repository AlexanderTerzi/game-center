import themes from '@/styles/themes';
import { search } from '@/utils/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Search = () => {
    const { theme } = useSelector((state) => state.theme);
    const currentTheme = themes[theme];

    return (
        <SearchBlock theme={currentTheme}>
            <div className="search">
                <input type="text" placeholder='Search...' />
                <button type='submit' className='search-button'>
                    {search}
                </button>
            </div>
        </SearchBlock>
    );
};

const SearchBlock = styled.form`
    .search {
        position: relative;

        input {
            background: ${props => props.theme.colorBg2};
            color: ${props => props.theme.colorWhite};
            padding: 0.6rem 0.7rem;
            border: 1px solid ${props => props.theme.colorIcons3};
            border-radius: ${props => props.theme.borderRadiusSm};
            font-family: inherit;
            width: 400px;
            transition: all 0.3s ease;

            &:focus, &:active {
                width: 500px;
                border: 1px solid ${props => props.theme.colorIcons};
            }

            &::placeholder {
                font-weight: 500;
            }
        }

        .search-button {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
`;

export default Search;