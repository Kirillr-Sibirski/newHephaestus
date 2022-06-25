import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                    Home
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/mint">
                    Mint NFTs
                </NavLink>
            </li>
        </ul>
    );
};

export default Navbar;
