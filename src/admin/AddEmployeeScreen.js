import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import "./AddEmployeeScreen.css";
import { addEmployeeSchema } from "../schemas/AddEmployeeSchema";
import { useAddEmployeeMutation } from "../services/AdminService";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router";
import { Screen } from "../components/Screen";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import menuBackgroundImage from "../assets/img/menu_background.jpg";
import ForbiddenScreen from ".././forbiddenscreen/ForbiddenScreen";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
};

const AddEmployeeScreen = () => {
    const currentUser = AuthService.getCurrentUser();
    const isAdmin = currentUser?.roles?.includes("ROLE_ADMIN");
    const toastRef = useRef(null);
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const addEmployeeMutation = useAddEmployeeMutation();

    useEffect(() => {
        console.log(currentUser);

        if (!currentUser) {
            navigate("/signin");
        }
    }, []);

    if (!isAdmin) {
        return <ForbiddenScreen />;
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: addEmployeeSchema,
            onSubmit: async (values) => {
                setIsButtonDisabled(true);
                try {
                    await addEmployeeMutation.mutateAsync(values);
                    toastRef.current = toast.success(
                        "Успешно добавен служител"
                    );
                    setTimeout(() => {
                        if (toastRef.current) {
                            toast.dismiss(toastRef.current);
                        }
                        navigate("/admin/allEmployees");
                    }, 2000);
                } catch (error) {
                    if (error?.response?.status === 403) {
                        console.log("asd");
                        navigate("/forbidden");
                    } else if (error?.response?.status === 401) {
                        navigate("/signin");
                    } else if (error?.response?.status === 500) {
                        toastRef.current = toast.error(
                            "Потребител с такъв имейл вече съществува"
                        );

                        setTimeout(() => {
                            if (toastRef.current) {
                                toast.dismiss(toastRef.current);
                            }
                            setIsButtonDisabled(false);
                        }, 2000);
                    }
                }
            }
        });

    useEffect(() => {
        console.log(currentUser);

        if (!currentUser) {
            navigate("/signin");
        }
    }, []);

    console.log(values);

    return (
        <>
            <Screen>
                <div className="flex justify-center items-center h-screen">
                    <div
                        className="min-h-screen flex flex-col items-center justify-center"
                        style={{
                            backgroundImage: `url(${menuBackgroundImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "100%"
                        }}
                    >
                        <div className="modal">
                            <form onSubmit={handleSubmit}>
                                {errors.firstName && touched.firstName ? (
                                    <p className="form-error mb-0 text-xs">
                                        {errors.firstName}
                                    </p>
                                ) : null}
                                <div className="input-block w-72 h-16">
                                    <label
                                        htmlFor="firstName"
                                        className="input-label"
                                    >
                                        Име
                                    </label>
                                    <input
                                        type="name"
                                        autoComplete="off"
                                        name="firstName"
                                        id="firstName"
                                        placeholder="Име"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                {errors.lastName && touched.lastName ? (
                                    <p className="form-error mb-0 text-xs">
                                        {errors.lastName}
                                    </p>
                                ) : null}
                                <div className="input-block w-72 h-16">
                                    <label
                                        htmlFor="lastName"
                                        className="input-label"
                                    >
                                        Фамилия
                                    </label>
                                    <input
                                        type="name"
                                        autoComplete="off"
                                        name="lastName"
                                        id="lastName"
                                        placeholder="Фамилия"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                {errors.email && touched.email ? (
                                    <p className="form-error mb-0 text-xs">
                                        {errors.email}
                                    </p>
                                ) : null}
                                <div className="input-block w-72 h-16">
                                    <label
                                        htmlFor="email"
                                        className="input-label"
                                    >
                                        Имейл
                                    </label>
                                    <input
                                        type="email"
                                        autoComplete="off"
                                        name="email"
                                        id="email"
                                        placeholder="Имейл"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                {errors.password && touched.password ? (
                                    <p className="form-error mb-0 text-xs">
                                        {errors.password}
                                    </p>
                                ) : null}
                                <div className="input-block w-72 h-16">
                                    <label
                                        htmlFor="password"
                                        className="input-label"
                                    >
                                        Парола
                                    </label>
                                    <input
                                        type="password"
                                        autoComplete="off"
                                        name="password"
                                        id="password"
                                        placeholder="Парола"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <div className="modal-buttons">
                                    <button
                                        className="input-button"
                                        type="submit"
                                        disabled={isButtonDisabled}
                                    >
                                        Добави служител
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Screen>
        </>
    );
};

export default AddEmployeeScreen;
