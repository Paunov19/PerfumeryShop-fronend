import React, { useState, useEffect, useRef } from "react";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { Screen } from "../Screen";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { registerFormSchema } from "../../schemas/RegisterFormSchema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: ""
};

const RegisterPage = (props) => {
    const navigate = useNavigate();
    const toastRef = useRef(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: registerFormSchema,
            onSubmit: (values) => {
                setIsButtonDisabled(true);

                AuthService.register(
                    values.email,
                    values.firstName,
                    values.lastName,
                    values.password
                ).then(
                    (response) => {
                        setIsRegistered(true);
                        console.log(response);
                    },
                    (error) => {
                        if (error.response.status === 400) {
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
                );
            }
        });

    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        if (isRegistered) {
            toastRef.current = toast.success("Ти се регистрира успешно!");

            setTimeout(() => {
                if (toastRef.current) {
                    toast.dismiss(toastRef.current);
                }
                navigate("/signin");
            }, 2000);
        }
    }, [[props.history]]);

    return (
        <div>
            <Screen>
                <div className="flex justify-center items-center h-screen">
                    <form onSubmit={handleSubmit} className="m-auto">
                        {errors.firstName && touched.firstName ? (
                            <p className="form-error text-xs mb-0">
                                {errors.firstName}
                            </p>
                        ) : null}
                        <h3>Регистриция</h3>
                        <div className="input-block w-72 h-16">
                            <label htmlFor="firstName" className="input-label">
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
                            <p className="form-error text-xs mb-0">
                                {errors.lastName}
                            </p>
                        ) : null}
                        <div className="input-block w-72 h-16">
                            <label htmlFor="lastName" className="input-label">
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
                            <p className="form-error text-xs mb-0">
                                {errors.email}
                            </p>
                        ) : null}
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
                        {errors.confirm_password && touched.confirm_password ? (
                            <p className="form-error text-xs mb-0">
                                {errors.confirm_password}
                            </p>
                        ) : null}
                        <div className="input-block w-72 h-16">
                            <label
                                htmlFor="confirm_password"
                                className="input-label"
                            >
                                Потвърди парола
                            </label>
                            <input
                                type="password"
                                autoComplete="off"
                                name="confirm_password"
                                id="confirm_password"
                                placeholder="Потвърди парола"
                                value={values.confirm_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className="modal-buttons">
                            <button
                                className="input-button px-2"
                                type="submit"
                                disabled={isButtonDisabled}
                            >
                                Регистрирай се
                            </button>
                        </div>
                        <div className="text-center">
                            Имаш регистрация?
                            <Link to="/signin" className="text-blue-500 px-1">
                                Влез в прифила си
                            </Link>
                        </div>
                    </form>
                </div>
            </Screen>
        </div>
    );
};

export default RegisterPage;
