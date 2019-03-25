import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainLayout from './layouts/MainLayout/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import RSAPage from './pages/RSAPage/RSAPage';
import AESPage from './pages/AESPage/AESPage';
import KeyGenPage from './pages/KeyGenPage/KeyGenPage';
import CamelliaPage from './pages/CamelliaPage/CamelliaPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

export default function router({ isAuthenticated }) {
    return (
        <BrowserRouter >
            <MainLayout>
                <Switch>
                    <Route path='/rsa' component={RSAPage} />
                    <Route path='/aes' component={AESPage} />
                    <Route path='/camellia' component={CamelliaPage} />
                    <Route path='/keygen' component={KeyGenPage} />
                    <Route path='/' exact component={HomePage} />
                    <Route path='/' component={NotFoundPage} />
                </Switch>
            </MainLayout>
        </BrowserRouter>
    );
}