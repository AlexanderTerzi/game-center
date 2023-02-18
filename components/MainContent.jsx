import Head from 'next/head';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import themes from '@/styles/themes';

const MainContent = ({ children, pageTitle, keywords }) => {
    const { theme } = useSelector((state) => state.theme);
    const { menuOpened } = useSelector((state) => state.UI);
    const currentTheme = themes[theme];

    return (
        <MainContentBlock
            theme={currentTheme}
            menuOpened={menuOpened}
        >
            <Head>
                <title>{`${pageTitle || 'Game Center'} | Game Center`}</title>
                <meta name="description" content="Game Center" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta keywords={`game center, game base, games ${keywords && keywords}`} />
            </Head>
            {children}
        </MainContentBlock>
    );
};

const MainContentBlock = styled.main`
    min-height: 100vh;
    background-color: ${props => props.theme.colorBg3};
    margin-top: 8vh;
    padding: 2rem 1.5rem;
    margin-left: ${props => props.menuOpened ? props.theme.sidebarCollapsed : props.theme.sidebarWidth};
    transition: all 0.3s ease;

    @media screen and (max-width: 870px){
        margin-top: 7.5rem;
    }

    @media screen and (max-width: 680px){
        margin-left: 0;
    }

    @media screen and (max-width: 440px){
        margin-top: 10rem;
    }
`;

export default MainContent;