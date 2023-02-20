import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/themeSlice';

import themes from '../styles/themes';
import Button from './Button';

interface IErrorBlockProps {
    title: string;
    reloadButton?: boolean;
}


const ErrorBlock: React.FC<IErrorBlockProps> = ({ title, reloadButton }) => {
    const { theme } = useSelector(selectTheme);
    const currentTheme = themes[theme];

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <ErrorContent theme={currentTheme}>
            <h2>
                {title}
            </h2>
            {
                reloadButton && (
                    <Button
                        name={'Refresh page'}
                        classes={'btn-login'}
                        padding={'0.6rem 2rem'}
                        borderRad={'0.8rem'}
                        fontWeight={'bold'}
                        fontSize={'1.2rem'}
                        background={currentTheme.colorPrimary2}
                        blob={'blob'}
                        click={refreshPage}
                    />
                )
            }
        </ErrorContent>
    );
};

const ErrorContent = styled.div`
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
        color: ${props => props.theme.colorWhite};
    }

    button {
        margin-top: 2rem;
    }
`;

export default ErrorBlock;