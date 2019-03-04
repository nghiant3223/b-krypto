import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainLayout from './layouts/MainLayout/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import RSAPage from './pages/RSAPage/RSAPage';
import AESPage from './pages/AESPage/AESPage';
import WhyPage from './pages/WhyPage/WhyPage';
import TwofishPage from './pages/TwofishPage/TwofishPage';


export default function router({ isAuthenticated }) {
    return (
        <BrowserRouter >
            <MainLayout>
                <Switch>
                    <Route path='/rsa' component={RSAPage} />
                    <Route path='/aes' component={AESPage} />
                    <Route path='/2fish' component={TwofishPage} />
                    <Route path='/why' component={WhyPage} />
                    <Route path='/' exact component={HomePage} />
                </Switch>
            </MainLayout>
        </BrowserRouter>
    );
}