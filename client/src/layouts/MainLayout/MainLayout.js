import React from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ModalConductor from '../../modals/ModalConductor';
import Snackbar from '../../components/Snackbar/Snackbar';

import './MainLayout.css';

const MainLayout = (props) => (
    <div className="Page">
        <Header />
        
        <main>
            {props.children}
        </main>

        <ModalConductor />
        <Snackbar />
        <Footer />
    </div>
);

export default MainLayout;