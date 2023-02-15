import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import { useDispatch, useSelector } from 'react-redux';
import { setOpenModal } from '@/redux/slices/singleGameSlice';

import Button from './Button';

import themes from '@/styles/themes';
import { play, star, starHalf } from '@/utils/icons';
import playstation from '../assets/playstation.svg'
import xbox from '../assets/xbox.svg'
import nitendo from '../assets/nitendo.svg'
import steam from '../assets/steam.svg'
import apple from '../assets/apple.svg'
import windows from '../assets/windows.svg'
import android from '../assets/android.svg'
import gamepad from '../assets/gamepad.svg'

const GameModal = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);
    const { name, platforms, rating, genres, background_image, website, reddit_url, description_raw, background_image_additional } = useSelector((state) => state.singleGame.game);
    const { status } = useSelector((state) => state.singleGame);
    const currentTheme = themes[theme];

    const ratingStars = Array.from({ length: 5 }, (_, i) => {
        const num = i + 0.5;
        return (
            <span key={i}>
                {
                    rating >= i + 1 ? (star) : rating >= num ? (starHalf) : ''
                }
            </span>
        )
    });

    const platformItem = (item) => {
        switch (item) {
            case 'PlayStation 4' || 'PlayStation 3' || 'PlayStation 2' || 'PlayStation 5' || 'PlayStation':
                return <Image src={playstation} alt="PlayStation 4" width={28} height={28} />
            case 'Xbox One' || 'Xbox 360' || 'Xbox Series X' || 'Xbox Series S/X':
                return <Image src={xbox} alt="Xbox One" width={28} height={28} />
            case 'Nintendo Switch' || 'Nintendo 3DS' || 'Nintendo':
                return <Image src={nitendo} alt="Nintendo Switch" width={28} height={28} />
            case 'PC' || 'Windows' || 'Windows 7':
                return <Image src={windows} alt="PC" width={28} height={28} />
            case 'Mac' || 'MacOS' || 'MacOSX' || 'Mac OS X':
                return <Image src={steam} alt="Mac" width={28} height={28} />
            case 'iOS' || 'iPhone' || 'iPad' || 'iPod' || 'iPod touch':
                return <Image src={apple} alt="iOS" width={28} height={28} />
            case 'Android' || 'Android OS' || 'Android Tablet':
                return <Image src={android} alt="Android" width={28} height={28} />
            default:
                return ''
        }
    }

    return (
        <GameModalBlock theme={currentTheme}>
            <div className="modal-content">
                <div className="top">
                    <div className="name">
                        <h2>
                            {name}
                        </h2>
                        <div className="rating">
                            <p>Rating</p>
                            {rating ? ratingStars : <span>No rating</span>}
                            {rating && `(${rating})`}
                        </div>
                    </div>
                    <div className="platforms">
                        <h2>Platforms</h2>
                        <div className="icons">
                            {
                                platforms && platforms.map((item) => {
                                    return (
                                        <span key={item.platform.name}>
                                            {
                                                platformItem(item.platform.name)
                                            }
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="image">
                    {background_image_additional && name && <Image
                        src={background_image_additional}
                        alt={name}
                        style={{ objectFit: "cover", borderRadius: theme.borderRadiusSm }}
                        sizes='100%'
                        priority
                        fill
                    />}
                    <div className="play">
                        <a href={website}>
                            {play}
                        </a>
                    </div>
                </div>
                <div className="genres">
                    {
                        genres && genres.map((genre) => (
                            <Button
                                name={genre.name}
                                key={genre.id}
                                background={currentTheme.buttonGradient4}
                                padding={'0.4rem 1rem'}
                                borderRad={'12px'}
                            />
                        ))
                    }
                </div>
                <div className="description">
                    <p>
                        {description_raw}
                    </p>
                </div>
            </div>
            <div className="modal-overlay" onClick={() => dispatch(setOpenModal())} />
        </GameModalBlock>
    );
};

const GameModalBlock = styled.div`
    width: 100%;
    min-height: 100vh;
    z-index: 6;
    position: fixed;
    top: 0;

    .modal-content {
        position: absolute;
        width: 64%;
        max-height: 90vh;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${props => props.theme.colorBg2};
        padding: 2.5rem;
        border-radius: ${props => props.theme.borderRadiusSm};
        box-shadow: ${props => props.theme.shadow3};
        z-index: 15;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            width: 0.5rem;
        }

        .rating {
            color: ${props => props.theme.colorWhite};
        }

        .image {
            position: relative;
            height: 500px;
            margin: 1rem 0;
            .play {
                position: absolute;
                bottom: 5%;
                left: 5%;
                a {
                    padding: 1rem;
                    display: flex;
                    background-color: ${props => props.theme.colorBg2};
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    justify-content: center;
                    align-items: center;
                    i {
                        font-size: 1.5rem;
                    }
                }
            }
        }

        .genres {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 1rem;
            button:not(:last-child){
                margin-right: 0.3rem;
            }
            button{
                border: 1px solid ${props => props.theme.colorIcons};
                transition: all 0.3s ease;
                &:hover {
                    box-shadow: ${props => props.theme.shadow5};
                }
            }
        }

        .description p{
            font-size: 15px;
            font-weight: 400;
            color: ${props => props.theme.colorWhite};
        }
    }
    
    .modal-overlay {
        width: 100%;
        height: 100%;
        background-color: ${props => props.theme.colorIcons4};
        position: absolute;
        top: 0;
        backdrop-filter: blur(5px);
    }

    .top {
        display: flex;
        justify-content: space-between;

        .name {
            display: flex;
            flex-direction: column;
            p {
                font-weight: 500;
                margin: 0.5rem 0;
                font-size: 20px;
            }
            span {
                margin-right: 0.3rem;
                i {
                    color: #fdcc0d;
                }
            }
            h2 {
                font-size: 2.5rem;
                font-weight: 500;
                background: linear-gradient(to right, #cf57a3 50%, #4731b6 110%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                color: transparent;

            }
        }

        .platforms {
            h2 {
                font-size: 24px;
                text-align: right;
                color: ${props => props.theme.colorGrey0};
            }

            .icons {
                display: flex;
                align-items: center;
                img{
                    margin-top: 1rem;
                    margin-right: 1rem;
                }
            }
        }
    }
`;

export default GameModal;