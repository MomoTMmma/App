import { Link } from "react-router-dom";
import React from "react";
import '../css/Nav.css';



const Nav = () => {
    return (
        <div>
            <nav className="nav">
                <div className="nav navbar-expand-sm">
                    <Link className="nav-item nav-link active" to='/'>Home</Link>
                    <Link className="nav-item nav-link active" to='/shop'>Shop</Link>
                    <Link className="nav-item nav-link active" to='/cart'>Cart</Link>
                </div>
            </nav>
        </div>
    );
}

export default Nav;