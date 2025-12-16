import React, { use, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
    const { user, LogOut } = use(AuthContext);

    const [dbUser, setDbUser] = useState(null);
    const email = user?.email;

    /* ---------------- FETCH USER FROM DB ---------------- */
    useEffect(() => {
        if (!email) return;

        axios
            .get(`http://localhost:3000/users?email=${email}`)
            .then((res) => setDbUser(res.data?.[0]))
            .catch((err) =>
                console.error("Failed to load user profile", err)
            );
    }, [email]);

    const handleLogout = () => {
        LogOut()
            .then(() => toast.success("Logout Successful!"))
            .catch((error) => toast.error(error.message));
    };

    /* ---------------- AVATAR LOGIC ---------------- */
    const avatarSrc =
        dbUser?.role === "hr"
            ? dbUser?.companyLogo || "https://i.ibb.co/2kR9zZS/user.png"
            : dbUser?.role === "employee"
                ? dbUser?.employeeLogo || "https://i.ibb.co/2kR9zZS/user.png"
                : user?.photoURL || "https://i.ibb.co/2kR9zZS/user.png";

    return (
        <div className="navbar bg-base-100 shadow-sm lg:px-6">
            {/* ================= LEFT ================= */}
            <div className="navbar-start">
                <div
                    className="tooltip tooltip-right"
                    data-tip={dbUser?.hrName || user?.displayName || user?.email}
                >
                    <div className="dropdown">
                        {/* BAR BUTTON */}
                        <label
                            tabIndex={0}
                            className="btn btn-ghost flex items-center gap-2"
                        >
                            <FaBars />
                            <span className="text-xl font-extrabold">
                                ASSET<span className="text-green-600">VERSE</span>
                            </span>
                        </label>

                        {/* BAR DROPDOWN MENU */}
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
                        >
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>

                            {dbUser?.role === "employee" && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/my-assets">My Assets</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/my-team">My Team</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/request-asset">
                                            Request Asset
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {dbUser?.role === "hr" && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/assets">Asset List</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/add-asset">Add Asset</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/requests">All Requests</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/employees">
                                            Employee List
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* ================= CENTER ================= */}
            <div className="navbar-center hidden md:flex gap-6 font-semibold">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-green-700 underline" : ""
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/join-as-employee"
                    className={({ isActive }) =>
                        isActive ? "text-green-700 underline" : ""
                    }
                >
                    Join as Employee
                </NavLink>

                <NavLink
                    to="/join-as-Manager"
                    className={({ isActive }) =>
                        isActive ? "text-green-700 underline" : ""
                    }
                >
                    Join as HR Manager
                </NavLink>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="navbar-end gap-3">
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-9 rounded-full border">
                            <img
                                src={avatarSrc}
                                alt="User Avatar"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    </label>

                    <ul
                        tabIndex={0}
                        className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
                    >
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                </div>

                {user ? (
                    <button
                        onClick={handleLogout}
                        className="btn font-bold text-green-600 border border-green-700"
                    >
                        Logout
                    </button>
                ) : (
                    <Link to="/login">
                        <button className="btn font-bold text-green-600 border-green-700">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
