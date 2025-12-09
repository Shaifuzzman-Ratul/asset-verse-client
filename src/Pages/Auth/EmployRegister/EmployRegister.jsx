// import React, { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { use } from 'react';

const EmployRegister = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // const {  } = use(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, setUser, user } = use(AuthContext);
    // const [isDisable, setIsDisable] = useState(false)
    // useEffect(() => {
    //     if (user) {
    //         setIsDisable(true);
    //     }
    // }, [user]);
    const onSubmit = async (data) => {
        // console.log(data);
        try {
            const res = await createUser(data.EmployeeEmail, data.EmployeePass)
            const user = res.user;
            setUser(user);
            toast.success("SignUp Successfull");

            const employeeInfo = {
                hrName: data.EmployeeName,
                hrEmail: data.EmployeeEmail,
                role: "employee",
                dateOfBirth: data.EmployeeDoB,
                createdAt: new Date(),
                updatedAt: new Date(),

            }
            await axios.post("http://localhost:3000/users", employeeInfo);
            navigate(`${location.state ? location.state : "/"}`)

        } catch (error) {
            const errorMessage = error.message;
            toast.error(errorMessage)

        }



    }
    return (
        <div className='flex flex-col lg:flex-row'>
            <div className='flex-1 items-center flex justify-center h-full w-full '>
                <form onSubmit={handleSubmit(onSubmit)} className='p-6 max-w-md  h-full  w-full' >
                    <h1 className='text-2xl font-bold  text-center p-3'>Sign Up as an Employee</h1>
                    <fieldset className="fieldset justify-center">
                        {/* name */}
                        <label className="">Name</label>
                        <input {...register("EmployeeName", { required: true })} type="text" className="input w-full" placeholder="Enter Full name" />


                        {/* email */}
                        <label className="">Email</label>
                        <input {...register("EmployeeEmail", { required: true })} type="email" className="input w-full" placeholder="Enter email" />
                        {/* password */}
                        <label className="">Password</label>
                        <input {...register("EmployeePass", { required: "Password is Required", minLength: { value: 6, message: "Minimun 6 character required" } })} type="password" className="input w-full" placeholder="Minmum 6 characters" />

                        {errors.EmployeePass && <p className='text-xs text-red-500'>{errors.EmployeePass.message}</p>}

                        {/* date of birth */}

                        <label className="">Date of Birth</label>
                        <input {...register("EmployeeDoB", { min: 18, max: 99 }, { required: true })} type="date" className="input w-full" />
                        {errors.EmployeeDOB && <p className='text-xs text-red-500'>{errors.EmployeeDOB.message}</p>}

                        <button className={`btn btn-neutral mt-4 ${user ? 'bg-gray-600' : 'bg-green-800'} text-white border-none `} disabled={!user}>
                            {user ? "Already Login" : "Register Now"}</button>
                    </fieldset>

                </form>
            </div>
            <div className="flex-1  bg-[url('https://i.ibb.co.com/pr3nSxyp/laptop-office-plant-black-background-top-view.jpg')] hidden lg:block lg:h-screen w-full bg-cover bg-center">
                <div className=' flex flex-col  justify-center items-center h-screen'>
                    <h2 className='text-white text-4xl font-bold'>Welcome !</h2>
                    <p className='text-gray-400 text-xl pt-2'>Let’s keep your assets organized and your tasks on track.</p>
                </div>

            </div>

        </div>
    );
};

export default EmployRegister;