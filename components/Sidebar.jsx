import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import themes from '@/styles/themes';

import menu from '@/utils/menu';

const Sidebar = () => {
    const { theme } = useSelector((state) => state.theme);
    const { menuOpened } = useSelector(state => state.UI);
    const currentTheme = themes[theme];

    const router = useRouter();

    const handleClickLink = (url) => {
        router.push(url);
    };

    return (
        <SidebarBlock theme={currentTheme} menuOpened={menuOpened}>
            <nav className="nav">
                <div className="nav-top">
                    <ul className='nav-list'>
                        {menu && menu.map((item) => (
                            <li
                                key={item.id}
                                onClick={() => handleClickLink(item.url)}
                                className={`nav-item ${router.pathname === item.url ? 'active' : ''}`}>
                                {item.icon}
                                <Link href={item.url}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
            <footer>
                <div className="links">
                    <Link href={'/terms'}>
                        Terms
                    </Link>
                    <Link href={'/privacy'}>
                        Privacy
                    </Link>
                    <Link href={'/help'}>
                        Help
                    </Link>
                </div>
                <p>
                    &copy; Copyright {new Date().getFullYear()}
                </p>
            </footer>
        </SidebarBlock>
    );
};

const SidebarBlock = styled.div`
    width: ${props => !props.menuOpened ? props.theme.sidebarWidth : props.theme.sidebarCollapsed};
    background-color: ${props => props.theme.colorBg2};
    position: fixed;
    height: calc(100vh - 8vh);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.3s ease;

    .nav {
        margin: 1rem 0rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        color: ${props => props.theme.colorWhite};

        .nav-item {
            padding: ${props => !props.menuOpened ? '0.6rem 2rem' : '0.79rem 2rem'} ;
            display: grid;
            grid-template-columns: 40px 1fr;
            margin: 0.3rem 0;
            position: relative;
            cursor: pointer;

            i {
                display: flex;
                align-items: center;
                justify-content: start;
            }

            &.active {
                background-color: ${props => props.theme.activeNavLink};

                i {
                    color: ${props => props.theme.colorWhite} !important;
                }

                &::after {
                    display: none;
                }
            }

            &::after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 0;
                height: 100%;
                background-color: ${props => props.theme.activeNavLinkHover};
                transition: all 0.3s ease;
                z-index: -1;
            }

            &:hover {
                &::after {
                    width: 100%;
                }
            }

            a {
                display: ${props => !props.menuOpened ? 'inline-block' : 'none'};
            }
        }
    }

    i {
        color: ${props => props.theme.colorIcons};
    }

    footer {
        padding: 1rem 2rem;
        border-top: 1px solid ${props => props.theme.borderColor};
        transition: all 0.3s ease;
        transform: ${props => !props.menuOpened ? 'translateX(0) ' : 'translateX(-200%)'};
        color: ${props => props.theme.colorWhite};

        .links {
            display: flex;
            align-items: center;
            justify-content: center;

            a {
                font-size: ${props => props.theme.fontSmall};
                margin: 0 0.5rem;
            }
        }

        p {
            font-size: ${props => props.theme.fontSmall};
            text-align: center;
            margin: 0.5rem 0;
        }
    }
`;

export default Sidebar;