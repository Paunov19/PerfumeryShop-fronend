import React, { useState, useEffect } from "react";
import { Screen } from "../components/Screen";
import { BiCheck, BiTimeFive } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { GetOrderById } from "../services/OrderService";

const OrderTrackingScreen = () => {
    const [orderStatus, setOrderStatus] = useState(1);
    const { orderId } = useParams();

    const { data: orderData, isLoading, isError } = GetOrderById(orderId);

    useEffect(() => {
        if (orderData) {
            setOrderStatus(orderStatusMapping[orderData.status]);
        }
    }, [orderData]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error fetching order data</p>;
    }

    const orderStatusMapping = {
        "Поръчката е направена": 1,
        "Поръчката е приета": 2,
        "Опаковане на поръчката": 3,
        "Готова за изпращане": 4,
        "Предадена на куриерската компания": 5,
        Доставена: 6
    };

    const renderStep = (stepNumber, stepName) => {
        const stepIconColor =
            orderStatus >= stepNumber ? "text-green-500" : "text-gray-500";

        return (
            <div className="flex items-center">
                <div className={`mr-2 ${stepIconColor}`}>
                    {orderStatus >= stepNumber ? (
                        <BiCheck className="w-6 h-6" />
                    ) : (
                        <BiTimeFive className="w-6 h-6" />
                    )}
                </div>
                <div className="text-sm">{stepName}</div>
            </div>
        );
    };

    return (
        <Screen>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white p-8 rounded shadow-md w-96">
                    <h2 className="mb-5 text-center">Статус на поръчката</h2>
                    {renderStep(1, "Поръчката е направена")}
                    {renderStep(2, "Поръчката е приета")}
                    {renderStep(3, "Опаковане на поръчката")}
                    {renderStep(4, "Готова за изпращане")}
                    {renderStep(5, "Предадена на куриерската компания")}
                    {renderStep(6, "Доставена")}
                </div>
            </div>
        </Screen>
    );
};

export default OrderTrackingScreen;
