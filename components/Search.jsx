import React, { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/redux/slices/searchSlice';

import themes from '@/styles/themes';
import { search } from '@/utils/icons';

const Search = () => {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector((state) => state.search);
    const { theme } = useSelector((state) => state.theme);
    const currentTheme = themes[theme];

    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef(null);

    const getSearchResult = async (query) => {
        dispatch(setSearchQuery(query));
    };

    const handleSearch = useCallback(debounce(function (val) {
        getSearchResult(val);
    }, 2000), []);

    const handleChangeInput = () => {
        setSearchValue(inputRef.current?.value);
        handleSearch(inputRef.current?.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchValue);
    }

    const clearResult = () => {
        setSearchValue('');
        dispatch(setSearchQuery(''));
    }

    return (
        <SearchBlock theme={currentTheme} onSubmit={handleSubmit}>
            <div className="search">
                <input
                    type="text"
                    placeholder='Search...'
                    ref={inputRef}
                    onChange={handleChangeInput}
                    value={searchValue || searchQuery}
                />
                {
                    searchQuery.length > 0 && <i
                        className="fa-solid fa-xmark"
                        onClick={clearResult}
                    ></i>
                }
                <button type='submit' className='search-button' onClick={handleSubmit}>
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

        i.fa-xmark {
            position: absolute;
            right: 50px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
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