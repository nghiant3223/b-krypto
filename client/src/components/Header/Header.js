import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './Header.css';

const Header = (props) => (
    <header className="Header">
        <div className="Header__left">
            <div className="Header__left__logo"><Link to="/">B-Krypto</Link></div>

            <ul className="Header__left__nav">
                <li><NavLink to="/rsa" activeClassName="Header__NavLink--active" className="Header__NavLink">RSA</NavLink></li>
                <li><NavLink to="/aes" activeClassName="Header__NavLink--active" className="Header__NavLink">AES</NavLink></li>
                <li><NavLink to="/camellia" activeClassName="Header__NavLink--active" className="Header__NavLink">Camellia</NavLink></li>
                <li><NavLink to="/keygen" activeClassName="Header__NavLink--active" className="Header__NavLink KeygenNav"> Key Generator</NavLink></li>
            </ul>
        </div>

        {/* <div className="Header__right">
            <button className="Header__right__login">Login</button>
            <button className="Header__right__signup">Sign up</button>
        </div> */}
    </header>
);

export default Header;