import React, { use } from 'react';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, LogOut } = use(AuthContext)
    const handleLogout = () => {
        LogOut().then(() => {
            toast.success('Logout Successfull !');
        }).catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage)
            // alert(errorCode)
        })

    }
    return (
        <div className=''>
            <div>
                {/* <Toaster></Toaster> */}
                <div className="navbar bg-base-100 shadow-sm lg:pr-6 lg:pl-6">
                    <div className="navbar-start">

                        {/*  */}
                        <div className='tooltip tooltip-right'
                            data-tip={user?.displayName || user?.email}
                        >

                            <div className="dropdown dropdown-down">
                                <div tabIndex={0} role="button" className=" flex items-center flex-row-reverse ">
                                    <a className="btn btn-ghost text-xl md:text-2xl lg:text-3xl font-extrabold ">ASSET<span className='text-green-600'>VERSE</span></a>

                                    <FaBars />

                                </div>
                                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li>
                                        <NavLink to="/"> <p>Home</p></NavLink>

                                    </li>
                                    <li>
                                        <NavLink to="/all-products"><p>All Products</p></NavLink>

                                    </li>
                                    <li>
                                        <NavLink to="/add-exports"><p>Add Product</p></NavLink>

                                    </li>
                                    <li>
                                        <NavLink to="/exports"><p>My Exports</p></NavLink>

                                    </li>

                                    <li>
                                        <NavLink to="/imports"><p>My Imports</p></NavLink>

                                    </li>
                                </ul>

                            </div>

                        </div>




                        {/*  */}
                    </div>
                    <div className="navbar-center flex flex-col ">

                        <div className=' lg:flex gap-4 pt-1 text-gray-600 text-sm hidden md:block font-semibold '>

                            <NavLink to="/" className={({ isActive }) =>
                                isActive ? "text-green-700 underline" : "text-gray-600"
                            }> <p className="hover:underline hover:text-blue-400">Home</p></NavLink>


                            <NavLink to="/join-as-employee"
                                className={({ isActive }) => isActive ? "text-green-700 underline" : "text-gray-600"
                                }>
                                <p className="hover:underline hover:text-blue-400">Join as Employee </p></NavLink>


                            <NavLink to="/join-as-Manager" className={({ isActive }) => isActive ? "text-green-700 underline" : "text-gray-600"
                            }><p className="hover:underline hover:text-blue-400"> Join as HR Manager</p></NavLink>

                        </div>
                        {/* <button */}
                    </div>
                    <div className="navbar-end gap-3">



                        {user ? (
                            <div className="dropdown dropdown-end z-50">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-9 border-2 border-gray-300 rounded-full">
                                        <img
                                            alt="User Avatar"
                                            referrerPolicy="no-referrer"
                                            src={
                                                user.photoURL ||
                                                "https://i.ibb.co.com/pv1JCj0X/user.png"
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        ) :
                            <div className="dropdown dropdown-end z-50">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-9 border-2 border-gray-300 rounded-full">
                                        <img
                                            alt="User Avatar"
                                            referrerPolicy="no-referrer"
                                            src={

                                                "https://i.ibb.co.com/pv1JCj0X/user.png"
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        }

                        {

                            user ? <button onClick={handleLogout} className="btn font-bold text-green-600 border  border-green-700">Logout</button> : <Link to="/login">
                                <button className="btn font-bold text-green-600  border-green-700">Login</button></Link>

                        }

                        {/* {
                            user ? "" : <Link to="/register"><button className="btn btn-primary">Sign In</button></Link>
                        } */}
                        {/* <button><input
                            type="checkbox"
                            onChange={(e) => handleTheme(e.target.checked)}
                            checked={theme === "dark"}
                            className="toggle"
                        />
                            <p className="text-xs font-medium">
                                {theme === "dark" ? "Dark" : "Light"}
                            </p>
                        </button> */}


                    </div>
                </div>
            </div >




        </div>
    );
};

export default Navbar;