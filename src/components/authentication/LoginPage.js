import React, { useState, useRef } from "react";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginFormSchema } from "../../schemas/LoginFormSchema";
import { Screen } from "../Screen";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
};

const LoginPage = () => {
    const toastRef = useRef(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: loginFormSchema,
            onSubmit: async (values, action) => {
                setIsButtonDisabled(true);

                AuthService.loginUser(values.email, values.password).then(
                    () => {
                        navigate("/");
                    },
                    (response) => {
                        if (response.status === 401) {
                            toastRef.current = toast.error(
                                "Невалиден имейл или парола"
                            );

                            setTimeout(() => {
                                if (toastRef.current) {
                                    toast.dismiss(toastRef.current);
                                }
                                action.resetForm();
                                setIsButtonDisabled(false);
                            }, 2000);
                        }
                    }
                );
            }
        });

    const navigate = useNavigate();

    return (
        <div>
            <Screen>
                <div className="flex justify-center items-center h-screen">
                    <form onSubmit={handleSubmit} className="m-auto">
                        {errors.email && touched.email ? (
                            <p className="form-error text-xs mb-0">
                                {errors.email}
                            </p>
                        ) : null}
                        <h3>Влез в прифила си</h3>
                        <div className="input-block w-72 h-16">
                            <label htmlFor="email" className="input-label">
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
                            <p className="form-error text-xs mb-0">
                                {errors.password}
                            </p>
                        ) : null}
                        <div className="input-block w-72 h-16">
                            <label htmlFor="password" className="input-label">
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
                                className="input-button mb-3"
                                type="submit"
                                disabled={isButtonDisabled}
                            >
                                Вход
                            </button>
                        </div>
                        <div className="text-center">
                            Нямаш регистрация?
                            <Link to="/signup" className="text-blue-500 px-1">
                                Регистрирай се тук
                            </Link>
                        </div>
                    </form>
                </div>
            </Screen>
        </div>
    );
};

export default LoginPage;
