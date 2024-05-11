import React, { Fragment, useEffect, useRef } from "react";
import { Screen } from "../Screen";
import {
    GetAllProductsByIds,
    useUpdateCartItemQuantityMutation,
    removeFromCart
} from "../../services/CartService";
import { Container } from "semantic-ui-react";
import { handleUnauthorized } from "../../services/HttpService";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { createOrderSchema } from "../../schemas/CreateOrderSchema";
import { useFormik } from "formik";
import { CreateOrder } from "../../services/OrderService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
    deliveryAddress: "",
    customerTelephone: ""
};

export default function CartScreen() {
    const { data, isError, isLoading } = GetAllProductsByIds();
    const updateCartItemQuantityMutation = useUpdateCartItemQuantityMutation();
    const toastRef = useRef(null);
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        if (!currentUser) {
            navigate("/signin");
        }
    }, []);

    const { cartItems } = data || {};

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const createOrderMutation = CreateOrder(queryClient);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: createOrderSchema,
            onSubmit: async (values, action) => {
                console.log("submitting form");

                const orderproducts = {
                    deliveryAddress: values.deliveryAddress,
                    customerTelephone: values.customerTelephone
                };

                console.log({ orderproducts });

                try {
                    const response = await createOrderMutation.mutateAsync(
                        orderproducts
                    );
                    console.log("Order created:", response);

                    toastRef.current = toast.success("Успешна поръчка!");

                    setTimeout(() => {
                        if (toastRef.current) {
                            toast.dismiss(toastRef.current);
                        }
                        navigate("/orders");
                    }, 2000);
                } catch (error) {
                    console.error("Error creating order:", error);
                }

                action.resetForm();
            }
        });

    if (isError) {
        handleUnauthorized();
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const calculateTotalPrice = () => {
        const total = cartItems.reduce((total, perfume) => {
            return total + perfume.price * perfume.quantity;
        }, 0);

        return total.toFixed(2);
    };

    const handleIncrease = async (cartItemId, currentQuantity) => {
        const newQuantity = currentQuantity + 1;

        try {
            await updateCartItemQuantityMutation.mutateAsync({
                cartItemId,
                newCartItem: { quantity: newQuantity }
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleDecrease = async (cartItemId, currentQuantity, perfumeId) => {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;

            try {
                await updateCartItemQuantityMutation.mutateAsync({
                    cartItemId,
                    newCartItem: { quantity: newQuantity }
                });
            } catch (error) {
                console.error(error.message);
            }
        } else {
            console.log("asd");
            await removeFromCart(perfumeId, queryClient);
        }
    };

    return (
        <Screen>
            <div className="max-w-[100%] h-[700px] w-full">
                <Fragment>
                    <Container id="page-container" className="py-4">
                        <div
                            className="text"
                            style={{ fontSize: "2em", fontWeight: "bold" }}
                        >
                            Количка
                        </div>
                        <Container
                            id="order-box"
                            className="ml-0 mt-4 sm:ml-16"
                        >
                            {cartItems?.length === 0 ? (
                                <p>Вашата количка е празна.</p>
                            ) : (
                                cartItems?.map((perfume, key) => (
                                    <div
                                        key={key}
                                        className="flex flex-col sm:flex-row sm:items-center mb-4"
                                    >
                                        <div className="flex">
                                            <img
                                                src={perfume.imageUrl}
                                                className="h-32 w-32 m-auto"
                                                alt={perfume.name}
                                            />
                                        </div>
                                        <div className="flex flex-col items-start mt-2 sm:mt-0 sm:ml-6">
                                            <p className="text-xl font-semibold">
                                                {perfume.name}
                                            </p>
                                            <p className="mt-1">
                                                <strong>
                                                    {perfume.price} лв
                                                </strong>
                                            </p>
                                            <div className="flex items-center mt-2">
                                                <FiMinusCircle
                                                    className="cursor-pointer mb-3"
                                                    onClick={() =>
                                                        handleDecrease(
                                                            perfume.cartItemId,
                                                            perfume.quantity,
                                                            perfume.id
                                                        )
                                                    }
                                                />
                                                <p className="mx-2">
                                                    Количество:{" "}
                                                    {perfume.quantity}
                                                </p>
                                                <FiPlusCircle
                                                    className="cursor-pointer mb-3"
                                                    onClick={() =>
                                                        handleIncrease(
                                                            perfume.cartItemId,
                                                            perfume.quantity
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}

                            {cartItems.length > 0 && (
                                <>
                                    <form
                                        onSubmit={handleSubmit}
                                        className="left-0 pl-0"
                                    >
                                        {errors.deliveryAddress &&
                                        touched.deliveryAddress ? (
                                            <p className="form-error text-xs mb-0">
                                                {errors.deliveryAddress}
                                            </p>
                                        ) : null}
                                        <div className="input-block w-72 h-20">
                                            <label
                                                htmlFor="deliveryAddress"
                                                className="input-label"
                                            >
                                                Адрес за доставка
                                            </label>
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                name="deliveryAddress"
                                                id="deliveryAddress"
                                                placeholder="Улица ..."
                                                value={values.deliveryAddress}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        {errors.customerTelephone &&
                                        touched.customerTelephone ? (
                                            <p className="form-error text-xs mb-0">
                                                {errors.customerTelephone}
                                            </p>
                                        ) : null}
                                        <div className="input-block w-72 h-20">
                                            <label
                                                htmlFor="customerTelephone"
                                                className="input-label"
                                            >
                                                Телефонен номер
                                            </label>
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                name="customerTelephone"
                                                id="customerTelephone"
                                                placeholder="+359 ..."
                                                value={values.customerTelephone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <p className="w-64 mb-2 ml-1">
                                            Общо:
                                            <strong className="ml-1">
                                                {calculateTotalPrice()} лв
                                            </strong>
                                        </p>
                                        <div>
                                            <button
                                                className="input-button w-72 mt-0"
                                                type="submit"
                                            >
                                                Завърши поръчката си
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </Container>
                    </Container>
                </Fragment>
            </div>
        </Screen>
    );
}
