import React from 'react';
import { useSelector } from 'react-redux';

import GameModal from './GameModal';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const { openModal } = useSelector((state) => state.singleGame);

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