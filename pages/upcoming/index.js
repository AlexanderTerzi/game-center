import Button from '@/components/Button';
import Game from '@/components/Game';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import MainContent from '@/components/MainContent';
import { fetchSingleGame, setOpenModal } from '@/redux/slices/singleGameSlice';
import { fetchUpcomingGames, setPerPage } from '@/redux/slices/upcomingGamesSlice';
import themes from '@/styles/themes';
import { down } from '@/utils/icons';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Upcoming = () => {
    const dispatch = useDispatch();
    const { upcomingGames, perPage, status } = useSelector((state) => state.upcomingGames);
    const { theme } = useSelector((state) => state.theme);
    const { openModal } = useSelector((state) => state.singleGame);
    const currentTheme = themes[theme];

    useEffect(() => {
        const UpcomingGamesData = (async () => {
            dispatch(fetchUpcomingGames({ perPage }));
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
                <MainContent>
                    {status === 'success' && (
                        <UpcomingGamesBlock>
                            {
                                upcomingGames && upcomingGames.map((game) => (
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
                        </UpcomingGamesBlock>
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

const UpcomingGamesBlock = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    grid-gap: 2rem;
`;

export default Upcoming;