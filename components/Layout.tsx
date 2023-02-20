import React from 'react';
import { useSelector } from 'react-redux';
import { selectSingleGame } from '../redux/slices/singleGameSlice';

import GameModal from './GameModal';
import Header from './Header';
import Sidebar from './Sidebar';

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    const { openModal } = useSelector(selectSingleGame);

    return (
        <>
            <Header />
            <Sidebar />
            {
                openModal && <GameModal />
            }
            {children}
        </>
    );
};

export default Layout;