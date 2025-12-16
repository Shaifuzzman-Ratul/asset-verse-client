import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { updateProfile } from 'firebase/auth'; // Import Firebase updateProfile
import React from 'react';

const EmployRegister = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, setUser, user } = React.useContext(AuthContext);

    const onSubmit = async (data) => {
        try {
            // Create user in Firebase
            const res = await createUser(data.EmployeeEmail, data.EmployeePass);
            const firebaseUser = res.user;

            // Update displayName in Firebase
            await updateProfile(firebaseUser, { displayName: data.EmployeeName });

            // Update AuthContext
            setUser(firebaseUser);

            toast.success("SignUp Successful");

            // Save additional employee info in your backend
            const employeeInfo = {
                EmployeeName: data.EmployeeName,
                EmployeeEmail: data.EmployeeEmail,
                role: "employee",
                dateOfBirth: data.EmployeeDoB,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            await axios.post("http://localhost:3000/users", employeeInfo);

            navigate(location.state ? location.state : "/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='flex flex-col lg:flex-row'>
            {/* Form */}
            <div className='flex-1 items-center flex justify-center h-full w-full'>
                <form onSubmit={handleSubmit(onSubmit)} className='p-6 max-w-md w-full'>
                    <h1 className='text-2xl font-bold text-center p-3'>Sign Up as an Employee</h1>
                    <fieldset className="fieldset justify-center">
                        <label>Name</label>
                        <input {...register("EmployeeName", { required: true })} type="text" className="input w-full" placeholder="Enter Full name" />

                        <label>Email</label>
                        <input {...register("EmployeeEmail", { required: true })} type="email" className="input w-full" placeholder="Enter email" />

                        <label>Password</label>
                        <input {...register("EmployeePass", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters required" } })} type="password" className="input w-full" placeholder="Minimum 6 characters" />
                        {errors.EmployeePass && <p className='text-xs text-red-500'>{errors.EmployeePass.message}</p>}

                        <label>Date of Birth</label>
                        <input {...register("EmployeeDoB", { required: true })} type="date" className="input w-full" />

                        <button className={`btn btn-neutral mt-4 ${user ? 'bg-gray-600' : 'bg-green-800'} text-white border-none`}>
                            {user ? "Already Logged In" : "Register Now"}
                        </button>
                    </fieldset>
                </form>
            </div>

            {/* Image / Welcome Section */}
            <div className="flex-1 hidden lg:block lg:h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co/pr3nSxyp/laptop-office-plant-black-background-top-view.jpg')" }}>
                <div className='flex flex-col justify-center items-center h-screen'>
                    <h2 className='text-white text-4xl font-bold'>Welcome!</h2>
                    <p className='text-gray-400 text-xl pt-2'>Let’s keep your assets organized and your tasks on track.</p>
                </div>
            </div>
        </div>
    );
};

export default EmployRegister;
