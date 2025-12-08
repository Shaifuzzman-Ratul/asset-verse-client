import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';

const Login = () => {
    const [show, setShow] = useState(false);
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data);

    }
    const handleShow = () => setShow(!show);
    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: false,
            offset: 100,
        });
    }, []);
    return (
        <div className='h-screen'>
            <div data-aos="flip-left" className='flex flex-col items-center justify-center mb-20 pt-20'>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>T</title>
                </Helmet>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset bg-white border-base-300 rounded-box w-xs border p-4 relative">
                        <h2 className='font-bold text-black text-xl text-center p-5'>Login Your account</h2>

                        <label className="label text-black">Email</label>
                        <input

                            type="email"
                            className="input"
                            placeholder="Email"
                            {...register("email")}
                            required
                        />

                        <label className="label text-black">Password</label>
                        <input
                            name='password'
                            type={show ? "text" : "password"}
                            className="input"
                            placeholder="Password"
                            required
                        />
                        <span className='absolute right-8 top-50 cursor-pointer z-30' onClick={handleShow}>
                            {show ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {/* onClick={handleForget} */}
                        <Link to="/reset"><p className='cursor-pointer hover:underline text-black'>Forget password?</p></Link>
                        <button type='submit' className="btn  mt-4 w-full bg-green-800 text-white">Login</button>
                    </fieldset>
                </form>

                <div className="mt-4 text-center">
                    {/* <button onClick={handleGoogle} className="btn pl-22 pr-20 border-2 border-black bg-white text-black">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <g>
                                <path d="m0 0H512V512H0" fill="#fff"></path>
                                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                            </g>
                        </svg>
                        Login with Google
                    </button> */}
                    <p className='text-sm font-semibold text-gray-500 text-center p-2'>
                        Don’t Have An Account? <Link to="/join-as-employee"><span className='text-green-700'>Register</span></Link>
                    </p>
                </div>
            </div>
        </div >
    );
};

export default Login;