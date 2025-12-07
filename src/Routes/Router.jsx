import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOuts/MainLayOut";
import Home from "../Pages/Home/Home/Home";
import HrRegister from "../Pages/Auth/HrRegister/HrRegister";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayOut,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/join-as-Manager",
                Component: HrRegister,
            }
        ]
    },
]);
