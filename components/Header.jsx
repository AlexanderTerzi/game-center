import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { setMenuToggle } from '@/redux/slices/UISlice';

import Search from './Search';
import Button from './Button';
import themes from '@/styles/themes';
import { bars, discord } from '@/utils/icons';
import logo from '../assets/logo.svg';
import ThemeToogler from './ThemeToogler';

const Header = () => {
    const dispatch = useDispatch();
    const { pathname } = useRouter();
    const { theme } = useSelector(state => state.theme);
    const { menuOpened } = useSelector(state => state.UI);
    const currentTheme = themes[theme];

    const handleClickMenu = () => {
        dispatch(setMenuToggle(!menuOpened));
    };

    return (
        <HeaderBlock theme={currentTheme}>
            <div className='logo-block'>
                <div className="menu">
                    <button type='button' onClick={handleClickMenu}>
                        {bars}
                    </button>
                </div>
                <div className="logo">
                    <Image src={logo} width={40} height={40} alt='Game Center' />
                    <h4>
                        Game Center
                    </h4>
                </div>
            </div>
            <div className="user">
                {
                    pathname === '/' && (
                        <div className="user-form">
                            <Search />
                        </div>
                    )
                }
                <ThemeToogler />
                <Button
                    name={'Join'}
                    classes={'btn-login'}
                    padding={'0.6rem 2rem'}
                    borderRad={'0.8rem'}
                    fontWeight={'bold'}
                    fontSize={'1.2rem'}
                    background={currentTheme.colorPrimary2}
                    blob={'blob'}
                    icon={discord}
                />
            </div>
        </HeaderBlock>
    );
};

const HeaderBlock = styled.header`
    height: 8vh;
    width: 100%;
    background-color: ${props => props.theme.colorBg};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${props => props.theme.padLRSm};
    z-index: 3;
    position: fixed;
    top: 0;

    i {
        color: ${props => props.theme.colorIcons};
        font-size: 1.5rem;
    }

    .logo-block {
        display: flex;
        align-items: center;

        .menu {
            button {
                outline: none;
                border: none;
                background: transparent;
                cursor: pointer;
                margin-right: 1rem;

                i {
                    font-size: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;

                    &:hover {
                        color: ${props => props.theme.colorIcons2};
                    }
                }
            }
        }

        .logo {
            display: flex;
            align-items: center;

            h4 {
                margin-left: 0.5rem;
                color: ${props => props.theme.colorGrey0};
            }
        }
    }

    .user {
        display: flex;
        align-items: center;

        .user-button {
            margin: ${props => props.theme.marLRSm};
        }

        i {
            transition: all 0.3s ease;
        }
    }
`;

export default Header;