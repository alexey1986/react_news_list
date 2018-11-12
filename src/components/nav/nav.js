import React from 'react';
import { NavLink } from "react-router-dom";
import './style.scss';

// TODO transfer array of links, use map to reder array list
class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-link"><NavLink to="/articles" activeClassName="active">Articles</NavLink></li>
                    {/* <li className="nav-link"><NavLink to="/tree" activeClassName="active">Tree View</NavLink></li> */}
                </ul>
            </nav>
        )
    }
}

export default NavBar;
