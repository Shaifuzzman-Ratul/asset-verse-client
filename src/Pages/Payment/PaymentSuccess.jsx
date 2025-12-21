import React, { use, useEffect } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const PaymentSuccess = () => {
    const { user } = use(AuthContext);
    useEffect(() => {
        if (!user) return;
        const urlParams = new URLSearchParams(window.location.search);
        const packageId = urlParams.get("packageId");
        const hrEmail = user?.email;

        if (hrEmail && packageId) {
            axios.patch('http://localhost:3000/hr/package-update', { hrEmail, packageId })
                .then(() => {
                    toast.success('Package limit increased successfully!');
                })
                .catch(err => {
                    console.error(err);
                    toast.error('Failed to update package limit');
                });
        }
    }, [user]);
    return (
        <div className=' p-9 mx-auto flex flex-col justify-center items-center'>
            <img className='rounded-2xl' src="https://i.ibb.co.com/6cTXH6Zw/image.png" alt="" />

            <Link to="/">  <button className=' m-6 bg-green-800 text-white btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl'>Home</button></Link>

        </div>


    );
};

export default PaymentSuccess;