import React, { useEffect } from "react";
import { Screen } from "../Screen";
import { GetUserOrders } from "../../services/OrderService";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderScreen = () => {
    const userOrdersQuery = GetUserOrders();
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        if (!currentUser) {
            navigate("/signin");
        }
    }, []);

    console.log(userOrdersQuery);

    if (userOrdersQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (userOrdersQuery.isError) {
        return <div>Error: {userOrdersQuery.error.message}</div>;
    }

    // Показваме поръчките обратно по дата
    const userOrders = userOrdersQuery.data.sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
    );

    const formatDate = (date) => {
        const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        };

        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
            new Date(date)
        );

        return formattedDate;
    };

    console.log(userOrders);

    const handleOrderClick = (order) => {
        if (order.status === "Отказана") {
            toast.warning("Поръчката ви е отказана", {
                autoClose: 1000
            });
        } else {
            navigate(`/orders/${order.id}`);
        }
    };

    return (
        <Screen>
            {userOrders.length === 0 ? (
                <h1
                    className="text-2xl font-bold mt-40"
                    style={{ color: "#55311c" }}
                >
                    Нямате активни поръчки
                </h1>
            ) : (
                <div className="flex flex-col h-screen mx-4 mt-8">
                    <h1
                        className="text-2xl font-bold mb-4"
                        style={{ color: "#55311c" }}
                    >
                        Вашите поръчки
                    </h1>
                    <div className="flex-grow max-w-4xl mx-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3">
                                        Дата и час на поръчката
                                    </th>
                                    <th className="p-3">Адрес за доставка</th>
                                    <th className="p-3">Обща цена</th>
                                    <th className="p-3">Статус на поръчката</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className={`border-t border-gray-300 cursor-pointer ${
                                            order.status === "Отказана"
                                                ? "bg-red-200"
                                                : order.status === "Доставена"
                                                ? "bg-green-200"
                                                : "bg-white"
                                        }`}
                                        onClick={() => {
                                            handleOrderClick(order);
                                        }}
                                    >
                                        <td className="p-3">
                                            {formatDate(order.orderDate)}
                                        </td>
                                        <td className="p-3">
                                            {order.deliveryAddress}
                                        </td>
                                        <td className="p-3">
                                            {order.totalPrice.toFixed(2)} лв.
                                        </td>
                                        <td
                                            className={`p-3 text-${order.status.toLowerCase()}`}
                                        >
                                            {order.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Screen>
    );
};

export default OrderScreen;
