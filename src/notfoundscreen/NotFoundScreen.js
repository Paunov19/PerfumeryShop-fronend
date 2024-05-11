import React from "react";
import notFoundImage from "../assets/img/not_found.jpg";
import { useNavigate } from "react-router";

const NotFoundScreen = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <img
                src={notFoundImage}
                alt="Forbidden"
                style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    marginBottom: "8px"
                }}
            />
            <button
                className="input-button w-64 h-16 mb-12"
                type="submit"
                onClick={handleGoBack}
            >
                Върни се към началната страница
            </button>
        </div>
    );
};

export default NotFoundScreen;
