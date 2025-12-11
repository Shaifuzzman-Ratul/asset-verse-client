// import axios from 'axios';
import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { imageUpload } from '../../../utils';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
const HrRegister = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, setUser, user } = use(AuthContext);
    const onSubmit = async (data) => {
        // console.log(data);
        const imageFile = data.CompanyLogo[0];
        // const formData = new FormData();
        // formData.append('image', imageFile);

        createUser(data.HREmail, data.HRPass).then((res) => {
            const user = res.user;
            setUser(user);
            toast.success("SignUp Successfull");
            navigate(`${location.state ? location.state : "/"}`)
        }).catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage)


        });


        try {
            // const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API}`, formData)
            // // console.log(data);
            // const imageURL = data?.data?.display_url
            const imageURl = await imageUpload(imageFile)
            console.log(imageURl);
            const hrInfo = {
                hrName: data.HRName,
                hrEmail: data.HREmail,
                email: data.HREmail,
                role: "hr",
                companyName: data.CompanyName,
                companyLogo: imageURl,
                packageLimit: 5,
                currentEmployees: 0,
                subscription: 'basic',
                dateOfBirth: data.HRDoB,
                createdAt: new Date(),
                updatedAt: new Date(),

            }
            axios.post("http://localhost:3000/users", hrInfo)

        } catch (error) {
            console.log(error);

        }



    }

    return (
        <div className='flex flex-col lg:flex-row'>
            <div className="flex-1  bg-[url('https://i.ibb.co.com/pr3nSxyp/laptop-office-plant-black-background-top-view.jpg')] hidden lg:block lg:h-screen w-full bg-cover bg-center">
                <div className=' flex flex-col  justify-center items-center h-screen'>
                    <h2 className='text-white text-4xl font-bold'>Welcome !</h2>
                    <p className='text-gray-400 text-xl '>Manage your company’s assets efficiently.</p>
                </div>
                {/* <img src="https://i.ibb.co.com/pr3nSxyp/laptop-office-plant-black-background-top-view.jpg" alt="" /> */}
            </div>
            <div className='flex-1 items-center flex justify-center h-full w-full '>
                <form onSubmit={handleSubmit(onSubmit)} className='p-6 max-w-md  h-full  w-full' >
                    <h1 className='text-2xl font-bold  text-center p-3'>Sign Up as an HR Manager</h1>
                    <fieldset className="fieldset justify-center">
                        {/* name */}

                        <label className="">Name</label>
                        <input {...register("HRName", { required: "Name is Required", })} type="text" className="input w-full" placeholder="Enter Full name" />
                        {errors.HRName && <p className='text-xs text-red-500'>{errors.HRName.message}</p>}
                        {/* company name */}
                        <label className="">Company Name</label>
                        <input  {...register("CompanyName", { required: "Company Name is Required" })} type="text" className="input w-full" placeholder="Enter company name" />
                        {errors.CompanyName && <p className='text-xs text-red-500'>{errors.CompanyName.message}</p>}
                        {/* logo */}
                        <label className=''>Company Logo </label>

                        <input {...register("CompanyLogo")} type="file" className="file-input file-input-neutral w-full" />

                        {/* email */}
                        <label className="">Email</label>
                        <input  {...register("HREmail", { required: "Email is Required", })} type="email" className="input w-full" placeholder="Enter email" />
                        {errors.HREmail && <p className='text-xs text-red-500'>{errors.HREmail.message}</p>}
                        {/* password */}
                        <label className="">Password</label>

                        <input {...register("HRPass", { required: "Password is Required", minLength: { value: 6, message: "Minimun 6 character required" } })} type="password" className="input w-full" placeholder="Minmum 6 characters" />

                        {errors.HRPass && <p className='text-xs text-red-500'>{errors.HRPass.message}</p>}

                        {/* date of birth */}
                        <label className="">Date of Birth</label>
                        <input {...register("HRDoB", { min: 18, max: 99 }, { required: true })} type="date" className="input w-full" />
                        {errors.HRDoB && <p className='text-xs text-red-500'>{errors.HRDoB.message}</p>}


                        <button className={`btn btn-neutral mt-4 ${user ? 'bg-gray-600' : 'bg-green-800'} text-white border-none `} disabled={!user}>
                            {user ? "Already Login" : "Register Now"}</button>
                    </fieldset>

                </form>
            </div>
        </div>
    );
};

export default HrRegister;