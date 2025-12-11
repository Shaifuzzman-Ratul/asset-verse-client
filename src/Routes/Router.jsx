import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOuts/MainLayOut";
import Home from "../Pages/Home/Home/Home";
import HrRegister from "../Pages/Auth/HrRegister/HrRegister";
import EmployRegister from "../Pages/Auth/EmployRegister/EmployRegister";
import Login from "../Pages/Auth/Login/Login";
import Reset from "../Pages/Auth/Forget/Reset";
import DashDoard from "../LayOuts/DashDoard";
import PrivateRoute from "../Context/AuthContext/PrivateRoute";
import AddAsset from "../Pages/DashBoardPages/HR/AddAsset";
import AssetList from "../Pages/DashBoardPages/HR/AssetList";
import RequestAsset from "../Pages/DashBoardPages/Employee/RequestAsset";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut></MainLayOut>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/login',
                Component: Login,

            },
            {
                path: '/reset',
                Component: Reset
            },
            {
                path: "/join-as-Manager",
                Component: HrRegister,
            },
            {
                path: "/join-as-employee",
                Component: EmployRegister,
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashDoard></DashDoard></PrivateRoute>,
        children: [
            {
                path: 'add-asset',
                element: <AddAsset></AddAsset>
            }, {
                path: 'asset-list',
                element: <AssetList></AssetList>
            }, {
                path: "request-asset",
                element: <RequestAsset></RequestAsset>
            }
        ]
    }
]);
