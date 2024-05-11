import { Screen } from "../components/Screen";
import UseId from "../hooks/useId";
import { GetPerfumeByIdQuery } from "../services/PerfumeService";
import React, { useState, useEffect } from "react";
import { AddToCart } from "../services/CartService";
import { useNavigate } from "react-router";

import AuthService from "../services/AuthService";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PerfumeViewScreen() {
    const id = UseId();
    const result = GetPerfumeByIdQuery(id);

    const navigate = useNavigate();

    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const addToCartMutation = AddToCart({
        id: id,
        quantity: 1
    });

    useEffect(() => {
        if (isAddedToCart) {
            toast.success("Добавено в количката");

            setTimeout(() => {
                setIsAddedToCart(false);
            }, 2000);
        }
    }, [isAddedToCart]);

    console.log(addToCartMutation?.error?.response?.status);

    if (addToCartMutation?.error?.response?.status === 401) {
        navigate("/signin");
    }

    const handleNavigateToCart = () => {
        if (AuthService.isLoggedIn()) {
            navigate("/checkout");
        } else {
            navigate("/signin");
        }
    };

    if (result.isLoading) return <h1>...Loading</h1>;
    const perfume = result.data;
    if (result.isError || !perfume) return <h1>Perfume not found</h1>;

    return (
        <Screen>
            <div
                className="min-h-screen flex flex-col items-center justify-center"
                style={{
                    background: "white",
                    width: "100%"
                }}
            >
                <div className="container mx-auto text-center">
                    <img
                        className="h-72 w-72 m-auto"
                        src={perfume.imageUrl}
                        alt="!!!problem!!!"
                    />
                    <div className="mt-4">
                        <h3 className="text-black">{perfume.name}</h3>
                        <p className="text-black">{perfume.products}</p>
                        <h3 className="text-black">{perfume.price} лв</h3>
                    </div>
                    <button
                        className="input-button w-64 m-auto mt-4"
                        onClick={() => {
                            addToCartMutation.mutate();
                            setIsAddedToCart(true);
                        }}
                    >
                        Добави в количката
                    </button>
                </div>
                <div>
                    <button
                        className="input-button w-64 m-auto mt-4"
                        // onClick={() => {
                        //     navigate("/checkout");
                        // }}
                        onClick={handleNavigateToCart}
                    >
                        Към количката
                    </button>
                </div>
            </div>
        </Screen>
    );
}
