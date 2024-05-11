import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link
                className="navbar-brand"
                to="/"
                style={{
                    fontSize: "1.5em",
                    fontWeight: "bold",
                    color: "white"
                }}
            >
                Dayana&apos;s perfumery
            </Link>
            {/* <div className="navbar-brand">
                <span className="navbar-logo">🍕</span>
                <span className="navbar-title">Dayana beauty</span>
            </div> */}
            <ul className="navbar-links">
                <li>
                    <Link to="/">Начало</Link>
                </li>
                {/* <li>
                    <Link to="/menu">Меню </Link>
                </li> */}
                <li>
                    <Link to="/signin">Вход</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
