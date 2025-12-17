
import Aos from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { TbCircleDashedNumber1, TbCircleDashedNumber2, TbCircleDashedNumber3, TbCircleDashedNumber4 } from 'react-icons/tb';

const HowITWorks = () => {
    useEffect(() => {
        Aos.init({
            duration: 950,
            once: false,
            offset: 100,
        });
    }, []);

    return (
        <div
            data-aos="fade-up"
            className="w-11/12 mx-auto 
                 bg-white dark:bg-gray-900 
                 text-gray-800 dark:text-gray-100 
                 flex flex-col lg:flex-row 
                 gap-10 lg:gap-20 items-center 
                 rounded-2xl py-10 px-6 shadow-md mb-12"
        >

            <div className="lg:pl-10 w-full lg:w-1/2">


                <h1 className="text-2xl lg:text-3xl font-bold mt-2">
                    How ASSET
                    <span className="text-[#33d775] ">VERSE</span> Works
                </h1>

                <div className="flex flex-col gap-5 mt-6">

                    <div className="flex items-center justify-between font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition">
                        <TbCircleDashedNumber1 className="text-blue-700 dark:text-blue-400 text-2xl" />
                        <p className="flex-1 mx-3">Sign Up</p>
                        <FaAngleDown className="opacity-70" />
                    </div>

                    <div className="flex items-center justify-between font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition">
                        <TbCircleDashedNumber2 className="text-blue-700 dark:text-blue-400 text-2xl" />
                        <p className="flex-1 mx-3">Browse for Your Desired Item</p>
                        <FaAngleDown className="opacity-70" />
                    </div>


                    <div className="flex items-center justify-between font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition">
                        <TbCircleDashedNumber3 className="text-blue-700 dark:text-blue-400 text-2xl" />
                        <p className="flex-1 mx-3">Send Request or add Asset  </p>
                        <FaAngleDown className="opacity-70" />
                    </div>


                    <div className="flex items-center justify-between font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition">
                        <TbCircleDashedNumber4 className="text-blue-700 dark:text-blue-400 text-2xl" />
                        <p className="flex-1 mx-3">Get Support Anytime</p>
                        <FaAngleDown className="opacity-70" />
                    </div>
                </div>
            </div>


            <div className="w-full lg:w-1/2 mt-6 lg:mt-0 flex justify-center">
                <img
                    className="max-h-[400px] w-full lg:w-auto rounded-2xl object-cover 
                     dark:brightness-75 hover:scale-[1.02] transition duration-300 shadow-lg"
                    src="https://i.ibb.co.com/MkcnX0Mv/photo-1519389950473-47ba0277781c.jpg"
                    alt="How it Works"
                />
            </div>
        </div>
    );
};

export default HowITWorks;
