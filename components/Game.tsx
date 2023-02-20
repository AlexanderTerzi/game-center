import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/themeSlice';

import themes from '../styles/themes';
import noimage from '../assets/noimage.jpg';

interface IGameProps {
    values: {
        name: string;
        background_image: string;
    },
    click: () => void;
}

const Game: React.FC<IGameProps> = ({ values, click }) => {
    const { theme } = useSelector(selectTheme);
    const currentTheme = themes[theme];

    const { name, background_image } = values;

    return (
        <GameBlock theme={currentTheme} onClick={click}>
            <div className="image">
                <Image
                    src={!background_image ? noimage : background_image}
                    alt={name}
                    style={{ objectFit: "cover", borderRadius: currentTheme.borderRadiusSm }}
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

    h2 {
        color: ${props => props.theme.colorWhite};
    }

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

        @media screen and (max-width: 870px){
            height: 320px;
        }
    }

    .title {
        padding: 2rem;

        @media screen and (max-width: 860px){
           font-size: 16px;
        }
    }
`;

export default Game;