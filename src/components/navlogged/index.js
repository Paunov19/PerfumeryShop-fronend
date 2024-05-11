import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import accountIcon from "../../assets/img/profile_icon.png";
import cartIcon from "../../assets/img/cart_icon.png";

const Navbar = () => {
    const [showAdminOptions, setShowAdminOptions] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showEmployeeOptions, setEmployeeOptions] = useState(false);

    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);

        console.log("asd");
    };

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setShowAdminOptions(user.roles.includes("ROLE_ADMIN"));
            setEmployeeOptions(user.roles.includes("ROLE_EMPLOYEE"));
        }
    }, []);

    const handleAddEmployeeButton = () => {
        navigate("/admin/addEmployee");
    };

    return (
        <div>
            <nav className="navbar " id="navbarColor02">
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
                    <span className="navbar-title">Daqna beauty</span>
                </div> */}
                <div>
                    <ul className="navbar-links px-2">
                        <li>
                            <Link to="/" className="px-0">
                                Начало
                            </Link>
                        </li>
                        {/* {!showAdminOptions && (
                            <li>
                                <Link to="/menu" className="mr-0">
                                    Меню
                                </Link>
                            </li>
                        )} */}
                        {currentUser && showAdminOptions && (
                            <li className="nav-item active">
                                <Link
                                    data-toggle="modal"
                                    data-target="#addEmployeeModal"
                                    className="mr-0"
                                    onClick={handleAddEmployeeButton}
                                >
                                    Добави служител
                                </Link>
                            </li>
                        )}
                        <Link
                            className="w-1 h-1 mr-8 mf-4 px-0 py-0"
                            onClick={toggleDropdown}
                        >
                            <div className="w-6 h-6 bg-cover relative">
                                {" "}
                                <div
                                    className="w-6 h-6 bg-cover"
                                    style={{
                                        backgroundImage: `url(${accountIcon})`
                                    }}
                                ></div>
                                <div className="relative top-0 left-0 w-full h-full"></div>
                            </div>
                            <div
                                className={`${
                                    isDropdownOpen ? "block" : "hidden"
                                } relative right-32 mt-2 p-2 w-36`}
                            >
                                <div
                                    className="p-2 shadow-md rounded"
                                    style={{ backgroundColor: "#333" }}
                                >
                                    <Link
                                        to="/profile"
                                        className="block px-3 py-2  hover:bg-gray-700"
                                    >
                                        Профил
                                    </Link>
                                    {showAdminOptions && (
                                        <Link
                                            to="/admin/allEmployees"
                                            className="block px-3 py-2  hover:bg-gray-700"
                                        >
                                            Всички служители
                                        </Link>
                                    )}
                                    {!showAdminOptions && (
                                        <>
                                            {showEmployeeOptions ? (
                                                <Link
                                                    to="/employee/orders"
                                                    className="block px-3 py-2 text-gray-100 hover:bg-gray-700"
                                                >
                                                    Всички поръчки
                                                </Link>
                                            ) : (
                                                <Link
                                                    to="/orders"
                                                    className="block px-3 py-2 text-gray-100 hover:bg-gray-700"
                                                >
                                                    Мои поръчки
                                                </Link>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </Link>
                        <li>
                            <Link to="/logout" className="ml-2">
                                Изход
                            </Link>
                        </li>
                        {!showAdminOptions && !showEmployeeOptions && (
                            <Link to="/checkout" className="mr-24">
                                <div
                                    className="w-4 h-4 bg-cover"
                                    style={{
                                        backgroundImage: `url(${cartIcon})`,
                                        width: "20px"
                                    }}
                                ></div>
                            </Link>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
