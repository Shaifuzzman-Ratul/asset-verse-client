import React from "react";
import { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext";
import Loader from "../../Components/Loader/Loader";

const PrivateRoute = ({ children }) => {
    const location = useLocation()
    const { user, loading } = use(AuthContext)
    if (loading) {
        return <Loader></Loader>
    }
    if (user) {
        return children;

    }
    return <Navigate state={location.pathname} to='/login'></Navigate >
};

export default PrivateRoute;