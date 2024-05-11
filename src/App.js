import React from "react";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./components/authentication/RegisterPage";
import LoginPage from "./components/authentication/LoginPage";
import Home from "./components/home/Home";
import Profile from "./components/authentication/ProfilePage";
import Logout from "./components/authentication/LogoutPage";
import PerfumeView from "./screens/perfume-view";
import MenuView from "./screens/menu";
import CartScreen from "./components/cart/CartScreen";
import AddEmployeeScreen from "./admin/AddEmployeeScreen";
import OrderScreen from "./components/OrderScreen/OrderScreen";
import OrderTrackingScreen from "./OrderTrackingScreen/OrderTrackingScreen";
import EmployeeUserOrdersScreen from "./employee/EmployeeUserOrdersScreen";

import ViewAllEmployeesScreen from "./admin/ViewAllEmployeesScreen";
import ForbiddenScreen from "./forbiddenscreen/ForbiddenScreen";
import NotFoundScreen from "./notfoundscreen/NotFoundScreen";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/signin",
            element: <LoginPage />
        },
        {
            path: "/logout",
            element: <Logout />
        },
        {
            path: "/signup",
            element: <RegisterPage />
        },
        {
            path: "/menu",
            element: <MenuView />
        },
        {
            path: "/profile",
            element: <Profile />
        },
        {
            path: "/perfume-view/:id",
            element: <PerfumeView />
        },
        {
            path: "/checkout",
            element: <CartScreen />
        },
        {
            path: "/admin/addEmployee",
            element: <AddEmployeeScreen />
        },
        {
            path: "/orders",
            element: <OrderScreen />
        },
        {
            path: "/orders/:orderId",
            element: <OrderTrackingScreen />
        },
        {
            path: "/employee/orders",
            element: <EmployeeUserOrdersScreen />
        },
        {
            path: "/admin/allEmployees",
            element: <ViewAllEmployeesScreen />
        },
        {
            path: "/forbidden",
            element: <ForbiddenScreen />
        },
        {
            path: "/*",
            element: <NotFoundScreen />
        }
    ]);

    return (
        <div style={{ background: "white" }}>
            <ToastContainer theme="dark" />
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
