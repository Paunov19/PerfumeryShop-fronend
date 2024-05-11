import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./ProfilePage.css";
import { Screen } from "../Screen";
import { useFormik } from "formik";
import { updateProfileSchema } from "../../schemas/UpdateProfileSchema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import menuBackgroundImage from "../../assets/img/menu_background.jpg";

const ProfilePage = () => {
    const navigate = useNavigate();
    const toastRef = useRef(null);

    const currentUser = AuthService.getCurrentUser();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: {
                firstName: currentUser ? currentUser.firstName : "",
                lastName: currentUser ? currentUser.lastName : "",
                email: currentUser ? currentUser.email : "",
                currentPassword: "",
                newPassword: "",
                confirm_newPassword: ""
            },
            validationSchema: updateProfileSchema,
            onSubmit: (values, action) => {
                setIsButtonDisabled(true);
                const updatedUser = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    currentPassword: values.currentPassword,
                    newPassword: values.newPassword
                };

                AuthService.updateProfile(currentUser.id, updatedUser).then(
                    (response) => {
                        toastRef.current = toast.success(
                            "Успешно променени данни"
                        );
                        console.log(response);

                        // Navigate to /orders after a delay
                        setTimeout(() => {
                            if (toastRef.current) {
                                toast.dismiss(toastRef.current);
                            }
                            navigate("/signin");
                        }, 2000);
                    },
                    (error) => {
                        if (error.response.status === 401) {
                            toastRef.current = toast.error(
                                "Грешна парола, моля опитай пак"
                            );

                            // Navigate to /orders after a delay
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

    useEffect(() => {
        console.log(currentUser);
        `¬`;

        if (!currentUser) {
            navigate("/signin");
        }
    }, []);

    return (
        <Screen>
            <div className="flex justify-center items-center h-screen ">
                <div
                    className="min-h-screen flex flex-col items-center justify-center"
                    style={{
                        backgroundImage: `url(${menuBackgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%"
                    }}
                >
                    <form onSubmit={handleSubmit} className="mb-4">
                        {errors.firstName && touched.firstName ? (
                            <p className="form-error text-xs">
                                {errors.firstName}
                            </p>
                        ) : null}
                        <h2 className="text-center mb-4 text-grey">
                            Редактиране на профила
                        </h2>
                        <div className="input-block w-72 h-16">
                            <label htmlFor="firstName" className="input-label">
                                Име
                            </label>
                            <input
                                //className=""
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
                            <p className="form-error text-xs ">
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
                            <p className="form-error text-xs">{errors.email}</p>
                        ) : null}
                        <div className="input-block  w-72 h-16">
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
                                disabled="disabled"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.currentPassword && touched.currentPassword ? (
                            <p className="form-error text-xs mb-0">
                                {errors.currentPassword}
                            </p>
                        ) : null}
                        <div className="input-block  w-72 h-16">
                            <label
                                htmlFor="currentPassword"
                                className="input-label"
                            >
                                Настояща парола
                            </label>
                            <input
                                type="password"
                                autoComplete="off"
                                name="currentPassword"
                                id="currentPassword"
                                placeholder="Настояща парола"
                                value={values.currentPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.newPassword && touched.newPassword ? (
                            <p className="form-error text-xs mb-0">
                                {errors.newPassword}
                            </p>
                        ) : null}
                        <div className="input-block w-72 h-16">
                            <label
                                htmlFor="newPassword"
                                className="input-label"
                            >
                                Нова парола
                            </label>
                            <input
                                type="password"
                                autoComplete="off"
                                name="newPassword"
                                id="newPassword"
                                placeholder="Нова парола"
                                value={values.newPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.confirm_newPassword &&
                        touched.confirm_newPassword ? (
                            <p className="form-error text-xs mb-0">
                                {errors.confirm_newPassword}
                            </p>
                        ) : null}
                        <div className="input-block w-72 h-16">
                            <label
                                htmlFor="confirm_newPassword"
                                className="input-label"
                            >
                                Потвърди нова парола
                            </label>
                            <input
                                type="password"
                                autoComplete="off"
                                name="confirm_newPassword"
                                id="confirm_newPassword"
                                placeholder="Потвърди нова парола"
                                value={values.confirm_newPassword}
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
                                Запиши
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Screen>
    );
};

export default ProfilePage;
