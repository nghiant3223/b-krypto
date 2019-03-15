import React, { Component } from 'react';
import { connect } from 'react-redux';

import Router from './router';

import './App.css';

class App extends Component {
    render() {
        return (
            <Router />
        );
    }
}

const mapStateToProps = ({ auth: { isAuthenticated }}) => ({ isAuthenticated });

export default connect(mapStateToProps)(App);
