import React from 'react';
import { Link } from 'react-router';

const PaymentCencel = () => {
    return (
        <div className=' p-9 mx-auto flex flex-col justify-center items-center'>
            <img className='rounded-2xl' src="https://i.ibb.co.com/kggPtBQw/image.png" alt="" />

            <Link to="/">  <button className=' m-6 bg-green-800 text-white btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl'>Home</button></Link>

        </div>
    );
};

export default PaymentCencel;