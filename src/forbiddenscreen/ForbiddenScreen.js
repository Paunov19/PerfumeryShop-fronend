import React from "react";
import forbiddenPageImage from "../assets/img/forbidden_page.jpg";
import { useNavigate } from "react-router";

const ForbiddenPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/"); // Replace "/" with the actual route of your home page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <img
                src={forbiddenPageImage}
                alt="Forbidden"
                className="max-w-full"
            />
            <button
                className="input-button w-64 h-16 mb-12" // Adjust the value of "mb-4" for the desired margin-bottom
                type="submit"
                onClick={handleGoBack}
            >
                Върни се към началната страница
            </button>
        </div>
    );
};

export default ForbiddenPage;
