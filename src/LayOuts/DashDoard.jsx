import React, { use } from 'react';
import { FaPeopleGroup, FaTableList } from 'react-icons/fa6';
import { GrUpgrade } from 'react-icons/gr';
import { IoIosAddCircle, IoIosPeople } from 'react-icons/io';
import { MdLogout } from 'react-icons/md';
import { Link, Outlet } from 'react-router';
import { AuthContext } from '../Context/AuthContext/AuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FiGitPullRequest } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import toast from 'react-hot-toast';

const DashDoard = () => {
    const { user, LogOut } = use(AuthContext);
    // console.log(user);
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
    const { data } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/users?email=${user.email}`);

            return res.data;
        }


    })
    // console.log('user:', user);
    // console.log('data:', data);
    const userInfo = data?.[0];
    return (
        <div>

            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-300">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <div className="px-4 font-bold ">{userInfo?.role === 'hr' ? "HR Dashboard" : "Employee Dashboard"}</div>
                    </nav>
                    {/* Page content here */}
                    <div className=' bg-gray-200 h-full'>
                        <Outlet></Outlet>
                    </div>

                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-green-200 is-drawer-close:w-14 is-drawer-open:w-64 ">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            {/* List item */}
                            <li>
                                {/* data-tip="Homepage" */}
                                <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" >
                                    {/* Home icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                    <span className="is-drawer-close:hidden">Homepage</span>
                                </Link>
                            </li>
                            {/* data-tip="Homepage" */}

                            <li>
                                {userInfo?.role === "hr" ? <Link to="/dashboard/asset-list" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" >
                                    {/* Home icon */}
                                    <FaTableList />
                                    <span className="is-drawer-close:hidden">Asset List</span>
                                </Link> : <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" >
                                    {/* Home icon */}
                                    <FaTableList />
                                    <span className="is-drawer-close:hidden">My Asset List</span>
                                </Link>}
                            </li>

                            <li>
                                {userInfo?.role === "hr" ? <Link to="/dashboard/add-asset" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" >
                                    {/* Home icon */}
                                    <IoIosAddCircle />
                                    <span className="is-drawer-close:hidden">Add an Asset</span>
                                </Link> : <Link to="/dashboard/request-asset" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" >
                                    {/* Home icon */}
                                    <FiGitPullRequest />

                                    <span className="is-drawer-close:hidden">Request Asset </span>
                                </Link>}
                            </li>


                            <li>
                                {userInfo?.role === "hr" ? <Link to="/dashboard/all-request" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" >
                                    {/* Home icon */}
                                    <FiGitPullRequest />
                                    <span className="is-drawer-close:hidden">All Requests</span>
                                </Link> : <Link to="/dashboard/my-team" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" >
                                    {/* Home icon */}
                                    <FaPeopleGroup />


                                    <span className="is-drawer-close:hidden">My Team </span>
                                </Link>}
                            </li>
                            <li>
                                {userInfo?.role === 'hr' && <Link to="/dashboard/my-employee" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" >
                                    {/* Home icon */}
                                    <FaPeopleGroup />
                                    <span className="is-drawer-close:hidden"> My Employee</span>
                                </Link>}
                            </li>

                            <li>
                                {userInfo?.role === 'hr' && <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" >
                                    {/* Home icon */}
                                    <GrUpgrade />
                                    <span className="is-drawer-close:hidden"> Upgrade Package</span>
                                </Link>}
                            </li>
                            <li>
                                <Link to="/dashboard/profile" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" >
                                    {/* Home icon */}
                                    <CgProfile />

                                    <span className="is-drawer-close:hidden">Profile</span>
                                </Link> </li>
                            <li onClick={handleLogout}>
                                <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" >
                                    {/* Home icon */}
                                    <MdLogout />
                                    <span className="is-drawer-close:hidden">Log Out</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashDoard;