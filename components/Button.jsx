import themes from '@/styles/themes';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Button = (props) => {
    const { icon, name, background, classes, padding, borderRad, fontWeight, fontSize, click, type, blob } = props;

    const { theme } = useSelector((state) => state.theme);
    const currentTheme = themes[theme];

    return (
        <ButtonEl
            theme={currentTheme}
            className={classes}
            onClick={click}
            type={type}
            style={{
                background: background,
                padding: padding,
                borderRadius: borderRad,
                fontWeight: fontWeight,
                fontSize: fontSize,
            }}
        >
            {icon}
            {name}
            <span className={blob}></span>
        </ButtonEl>
    );
};

const ButtonEl = styled.button`
    display: flex;
    align-items: center;
    position: relative;
    color: ${props => props.theme.colorWhite2};
    z-index: 5;
    overflow: hidden;

    i {
        margin-right: 1rem;
        color: ${props => props.theme.colorGrey0} !important;
        font-size: 1.5rem;
    }

    .blob {
        position: absolute;
        top: 30px;
        right: -60px;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        z-index: -1;
        background-color: ${props => props.theme.colorIcons};
        opacity: 0.7;
        transition: all 0.3s ease;
    }

    &:hover {
        .blob {
            transform: scale(1.7);
        }
    }
`;

export default Button;