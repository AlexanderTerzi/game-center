import styled from 'styled-components';

import { useSelector } from 'react-redux';
import themes from '@/styles/themes';

const MainContent = ({ children }) => {
    const { theme } = useSelector((state) => state.theme);
    const currentTheme = themes[theme];

    return (
        <MainContentBlock theme={currentTheme}>
            {children}
        </MainContentBlock>
    );
};

const MainContentBlock = styled.main`
    min-height: 100vh;
    background-color: ${props => props.theme.colorBg3};
    margin-top: 8vh;
    padding: ${props => props.theme.sidebarWidth};
`;

export default MainContent;