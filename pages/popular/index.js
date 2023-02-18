import React, { useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularGames, setPerPage } from '@/redux/slices/popularGamesSlice';
import { fetchSingleGame, setOpenModal } from '@/redux/slices/singleGameSlice';

import Button from '@/components/Button';
import Game from '@/components/Game';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import MainContent from '@/components/MainContent';
import { down } from '@/utils/icons';

import themes from '@/styles/themes';

const Popular = () => {
    const dispatch = useDispatch();
    const { popularGames, perPage, status } = useSelector((state) => state.popularGames);
    const { theme } = useSelector((state) => state.theme);
    const currentTheme = themes[theme];

    useEffect(() => {
        const PopularGamesData = (async () => {
            dispatch(fetchPopularGames({ perPage }));
        })();
    }, [perPage]);

    const fetchGame = async (id) => {
        dispatch(fetchSingleGame({ id }));
    };

    const handleModal = (id) => {
        dispatch(setOpenModal(id))
    };

    const handleCLickPerPage = () => {
        dispatch(setPerPage(perPage + 6));
    };

    return (
        <>
            <Head>
                <title>Popular |Game Center</title>
            </Head>
            <Layout>
                <MainContent pageTitle={'Popular'} keywords={'popular games, last games'}>
                    {status === 'success' && (
                        <PopularGamesBlock>
                            {
                                popularGames && popularGames.map((game) => (
                                    <Game
                                        key={game.id}
                                        values={{ ...game }}
                                        click={() => {
                                            fetchGame(game.id)
                                            handleModal(game.id)
                                        }}
                                    />
                                ))
                            }
                        </PopularGamesBlock>
                    )}
                    {
                        status === 'loading' && <Loader />
                    }
                    <div className="load-more">
                        {
                            status === 'success' && (
                                <Button
                                    name='Load more'
                                    blob='blob'
                                    background={currentTheme.colorPrimary}
                                    padding='0.7rem 1.2rem'
                                    borderRad='10px'
                                    fontWeight='bold'
                                    fontSize='1.2rem'
                                    icon={down}
                                    click={handleCLickPerPage}
                                />
                            )
                        }
                    </div>

                </MainContent>
            </Layout>
        </>
    );
};

const PopularGamesBlock = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    grid-gap: 2rem;

    @media screen and (max-width: 870px){
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
`;

export default Popular;