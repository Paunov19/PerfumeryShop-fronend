import React, { useState, useEffect } from "react";
import { Screen } from "../components/Screen";
import {
    useAllEmployeesQuery,
    useDeleteEmployeeMutation,
    useChangeEmployeeRole
} from "../services/AdminService";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewAllusersScreen = () => {
    const currentUser = AuthService.getCurrentUser();
    const { data: users, isLoading, isError } = useAllEmployeesQuery();
    const { mutate: deleteuser } = useDeleteEmployeeMutation();
    const [userToDelete, setuserToDelete] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [editedRoles, setEditedRoles] = useState({});
    const changeUserRoleMutation = useChangeEmployeeRole();

    useEffect(() => {
        console.log(currentUser);

        if (!currentUser) {
            navigate("/signin");
        }
    }, []);

    console.log(users);

    if (isLoading) {
        return <Screen>Loading...</Screen>;
    }

    if (isError) {
        return <Screen>Error loading users.</Screen>;
    }

    const handleDeleteuser = async (userId) => {
        await deleteuser(userId);
        closeModal();

        toast.success("Успешно премахнат служител", {
            autoClose: 1000
        });
    };

    const openModal = (userId) => {
        setuserToDelete(userId);
        setShowModal(true);
    };

    const closeModal = () => {
        setuserToDelete(null);
        setShowModal(false);
    };

    const roleMappings = {
        Потребител: "ROLE_USER",
        Служител: "ROLE_EMPLOYEE",
        Администратор: "ROLE_ADMIN"
    };

    const handleRoleChange = async (userId, newRole) => {
        setEditedRoles((prevRoles) => ({
            ...prevRoles,
            [userId]: newRole
        }));

        const englishRole = roleMappings[newRole];

        try {
            const requestData = {
                userId: userId,
                newRole: englishRole
            };
            await changeUserRoleMutation.mutateAsync(requestData);
            toast.success("Успешна променихте ролята на този потребител", {
                autoClose: 1000
            });
        } catch (error) {
            console.error("Error changing user role:", error);
        }
    };

    const getRoleForuser = (user) => {
        if (editedRoles[user.id]) {
            return editedRoles[user.id];
        }

        if (user.roles.some((role) => role.name === "ROLE_EMPLOYEE")) {
            return "Служител";
        } else if (user.roles.some((role) => role.name === "ROLE_ADMIN")) {
            return "Администратор";
        } else {
            return "Потребител";
        }
    };

    console.log(users);

    return (
        <Screen>
            <div className="mx-4 mt-8">
                <div className="max-w-screen-xl mx-auto">
                    {users.length === 0 ? (
                        <h1
                            className="text-2xl font-bold mb-4"
                            style={{ color: "#55311c" }}
                        >
                            Все още няма добавени служители
                        </h1>
                    ) : (
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3">Име</th>
                                    <th className="p-3">Фамилия</th>
                                    <th className="p-3">Имейл</th>
                                    <th className="p-3">Роля</th>
                                    <th className="p-3">Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-t border-gray-300"
                                    >
                                        <td className="p-3">
                                            {user.firstName}
                                        </td>
                                        <td className="p-3">{user.lastName}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td>
                                            <select
                                                value={getRoleForuser(user)}
                                                onChange={(event) =>
                                                    handleRoleChange(
                                                        user.id,
                                                        event.target.value
                                                    )
                                                }
                                            >
                                                <option value="Потребител">
                                                    Потребител
                                                </option>
                                                <option value="Служител">
                                                    Служител
                                                </option>
                                                <option value="Администратор">
                                                    Администратор
                                                </option>
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    openModal(user.id)
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-trash ml-8 mt-3 text-red-600"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p className="text-xl font-semibold mb-4">
                            Сигурни ли сте, че искате да премахнете този
                            служител?
                        </p>
                        <div>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={() => handleDeleteuser(userToDelete)}
                            >
                                Да
                            </button>
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 "
                            >
                                Не
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Screen>
    );
};
export default ViewAllusersScreen;
