import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = (props) => (
    <header className="Header">
        <div className="Header__left">
            <div className="Header__left__logo"><Link to="/">Crypto</Link></div>

            <ul className="Header__left__nav">
                <li><Link to="/rsa">RSA</Link></li>
                <li><Link to="/aes">AES</Link></li>
                <li><Link to="/2fish">Twofish</Link></li>
                <li><Link to="/why">Why?</Link></li>
            </ul>
        </div>

        <div className="Header__right">
            <button className="Header__right__login">Login</button>
            <button className="Header__right__signup">Sign up</button>
        </div>
    </header>
);

export default Header;