import React from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ModalConductor from '../../modals/ModalConductor';

import './MainLayout.css';

const MainLayout = (props) => (
    <div className="Page">
        <Header />
        
        <main>
            {props.children}
        </main>

        <ModalConductor />
        <Footer />
    </div>
);

export default MainLayout;