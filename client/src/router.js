import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainLayout from './layouts/MainLayout/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import RSAPage from './pages/RSAPage/RSAPage';
import AESPage from './pages/AESPage/AESPage';
import WhyPage from './pages/WhyPage/WhyPage';
import KeyGenPage from './pages/KeyGenPage/KeyGenPage';
import CamelliaPage from './pages/CamelliaPage/CamelliaPage';


export default function router({ isAuthenticated }) {
    return (
        <BrowserRouter >
            <MainLayout>
                <Switch>
                    <Route path='/rsa' component={RSAPage} />
                    <Route path='/aes' component={AESPage} />
                    <Route path='/camellia' component={CamelliaPage} />
                    <Route path='/why' component={WhyPage} />
                    <Route path='/keygen' component={KeyGenPage} />
                    <Route path='/' exact component={HomePage} />
                </Switch>
            </MainLayout>
        </BrowserRouter>
    );
}