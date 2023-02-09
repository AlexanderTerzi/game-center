import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import { useDispatch, useSelector } from 'react-redux';

import themes from '@/styles/themes';
import noimage from '../assets/noimage.jpg';

const Game = ({ values, click }) => {
    const { theme } = useSelector((state) => state.theme);
    const currentTheme = themes[theme];

    const { name, background_image } = values;

    return (
        <GameBlock theme={currentTheme} onClick={click}>
            <div className="image">
                <Image
                    src={!background_image ? noimage : background_image}
                    alt={name}
                    style={{ objectFit: "cover", borderRadius: theme.borderRadiusSm }}
                    sizes='100%'
                    priority
                    fill
                />
            </div>
            <div className="title">
                <h2>
                    {name}
                </h2>
            </div>
        </GameBlock>
    );
};

const GameBlock = styled.div`
    width: 100%;
    background-color: ${props => props.theme.colorBg2};
    border-radius: ${props => props.theme.borderRadiusSm};
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;

    img {
        transition: all 0.3s ease;
    }

    &:hover {
        img {
            transform: scale(1.1);
        }
    }

    .image {
        height: 500px;
        position: relative;
        overflow: hidden;
        border-radius: ${props => props.theme.borderRadiusSm};
    }

    .title {
        padding: 2rem;
    }
`;

export default Game;