import React from 'react';
import { useRouter } from 'next/router'
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/themeSlice';

import Button from '../components/Button';
import Layout from '../components/Layout';
import MainContent from '../components/MainContent';
import themes from '../styles/themes';

const NotFoundPage = React.memo(() => {
    const router = useRouter();
    const { theme } = useSelector(selectTheme);
    const currentTheme = themes[theme];

    const goToMainPage = () => {
        router.push('/');
    };

    return (
        <>
            <Layout>
                <MainContent pageTitle={'404'}>
                    <NotFoundBlock theme={currentTheme}>
                        <h1>
                            This page doesn't exist =(
                        </h1>
                        <Button
                            name={'Go to the main page'}
                            classes={'btn-login'}
                            padding={'0.6rem 2rem'}
                            borderRad={'0.8rem'}
                            fontWeight={'bold'}
                            fontSize={'1.2rem'}
                            background={currentTheme.colorPrimary2}
                            blob={'blob'}
                            click={goToMainPage}
                        />
                    </NotFoundBlock>
                </MainContent>
            </Layout>
        </>
    );
});

const NotFoundBlock = styled.div`
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1 {
        margin-bottom: 2rem;
    }
`;

export default NotFoundPage;