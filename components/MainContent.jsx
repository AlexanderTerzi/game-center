import styled from 'styled-components';

import { useSelector } from 'react-redux';
import themes from '@/styles/themes';


const MainContent = ({ children }) => {
    const { theme } = useSelector((state) => state.theme);
    const { menuOpened } = useSelector((state) => state.UI);
    const currentTheme = themes[theme];

    return (
        <MainContentBlock theme={currentTheme} menuOpened={menuOpened}>
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
`;

export default MainContent;