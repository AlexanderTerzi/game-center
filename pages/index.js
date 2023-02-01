import { useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, setPerPage } from '@/redux/slices/gamesSlice';

import Game from '@/components/Game';
import Layout from '@/components/Layout';
import MainContent from '@/components/MainContent';
import Button from '@/components/Button';
import { down } from '@/utils/icons';
import themes from '@/styles/themes';
import Loader from '@/components/Loader';

export default function Home() {
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.games);
  const { perPage } = useSelector((state) => state.games);
  const { theme } = useSelector((state) => state.theme);
  const { status } = useSelector((state) => state.games);
  const currentTheme = themes[theme];

  useEffect(() => {
    const fetchProducts = (async () => {
      dispatch(fetchGames({ perPage }));
    })();

  }, [perPage]);

  const handleCLickPerPage = () => {
    dispatch(setPerPage(perPage + 6));
  }

  return (
    <>
      <Layout>
        <MainContent>
          <HomePageBlock>
            {
              status === 'success' && (
                <div className="games-list">
                  {
                    games && games.map((game) => (
                      <Game
                        key={game.id}
                        values={{ ...game }}
                      />
                    ))
                  }
                </div>
              )
            }
            {
              status === 'loading' && <Loader />
            }
          </HomePageBlock>
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
  )
};

const HomePageBlock = styled.div`
  .games-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    grid-gap: 2rem;
  }
`;