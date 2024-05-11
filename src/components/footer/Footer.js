import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="text-center mb-0 bg-[#333]">
            <ul className="flex justify-center py-4">
                <li className="list-none px-3">
                    <Link to="#social-media" className="text-white">
                        <i className="fab fa-facebook text-2xl" />
                    </Link>
                </li>
                <li className="list-none px-3">
                    <Link to="#social-media" className="text-white">
                        <i className="fab fa-instagram text-2xl" />
                    </Link>
                </li>
                <li className="list-none px-3">
                    <Link to="#social-media" className="text-white">
                        <i className="fab fa-twitter text-2xl" />
                    </Link>
                </li>
            </ul>
            <p className="text-white font-courgette mb-0 pb-2">
                2024 Dayana&apos;s perfumery. Всички права запазени
            </p>
        </footer>
    );
};

export default Footer;
