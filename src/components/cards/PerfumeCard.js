import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ChangePerfumeAvailability } from "../../services/EmployeeService";
import AuthService from "../../services/AuthService";
import { toast } from "react-toastify";

const PerfumeCard = (props) => {
    const { id, name, imageUrl, available } = props.details;
    const currentLoggedUser = AuthService.getCurrentUser();
    const queryClient = useQueryClient();
    const [availabilityChanged, setAvailabilityChanged] = useState(false);
    const [availabilityMessage, setAvailabilityMessage] = useState("");

    const isEmployee = currentLoggedUser?.roles?.includes("ROLE_EMPLOYEE");

    const changePerfumeAvailabilityMutation =
        ChangePerfumeAvailability(queryClient);

    const handleChangeAvailability = async () => {
        try {
            await changePerfumeAvailabilityMutation.mutate(id);
            setAvailabilityChanged(true);
            setAvailabilityMessage(
                available
                    ? "Променен статус: Изчерпан"
                    : "Променен статус: Наличен"
            );
        } catch (error) {
            console.error("Error changing availability:", error);
        }
    };

    useEffect(() => {
        if (availabilityChanged) {
            toast.success(availabilityMessage);

            setTimeout(() => {
                setAvailabilityChanged(false);
                setAvailabilityMessage("");
            }, 2000);
        }
    }, [availabilityChanged, availabilityMessage]);

    return (
        <div
            className={`text-center border-2 border-gray-400 rounded-md shadow-md ${
                !available && !isEmployee ? "bg-red-400" : "bg-black"
            } bg-opacity-50`}
        >
            <div className="container mt-5">
                <Link
                    to={
                        isEmployee
                            ? "#"
                            : available
                            ? `/perfume-view/${id}`
                            : null
                    }
                    className={`no-underline ${
                        !available ? "cursor-default" : ""
                    }`}
                >
                    <img
                        className="h-48 w-48 m-auto mb-4"
                        src={imageUrl}
                        alt="adgadg"
                    />
                    <h3 className="text-white mb-2">{name}</h3>

                    <div id="perfume-order-info">
                        {isEmployee ? (
                            <button
                                className="input-button w-70"
                                onClick={handleChangeAvailability}
                                style={{ height: "80px" }}
                            >
                                {available
                                    ? "Смени статус: Изчерпан"
                                    : "Смени статус: Наличен"}
                            </button>
                        ) : (
                            <button
                                className={`input-button w-70 ${
                                    !available ? "cursor-default" : ""
                                }`}
                                style={{ height: "50px" }}
                            >
                                {available ? "Избери" : "Изчерпан"}
                            </button>
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default PerfumeCard;
