import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import themes from '@/styles/themes';

const Loader = () => {
    const { theme } = useSelector((state) => state.theme);
    const currentTheme = themes[theme];

    return (
        <Spinner theme={currentTheme}>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </Spinner>
    );
};

const Spinner = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .lds-ring {
        display: inline-block;
        position: relative;
        width: 70px;
        height: 70px;
    }
    .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 45px;
    height: 45px;
    margin: 8px;
    border: 4px solid ${props => props.theme.colorPrimary};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${props => props.theme.colorPrimary} transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
    }
    @keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    }
`;

export default Loader;