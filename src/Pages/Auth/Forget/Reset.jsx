import React, { use, useState } from 'react';
import toast from 'react-hot-toast';
// import { AuthContext } from '../../provider/AuthProvider';
import { Helmet } from "react-helmet";
import { AuthContext } from '../../../Context/AuthContext/AuthContext';

const Reset = () => {
    const { reset } = use(AuthContext);
    const [email, setEmail] = useState("")
    const handleReset = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('please enter email !')

        }
        reset(email).then(() => {
            toast.success(`Reset link send to ${email}`)
        }).catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage)
        })
    }
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-purple-300 via-[#4f89f9] to-purple-300 text-center">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Forget Page</title>
            </Helmet>
            <div className="flex justify-center">

                <form onSubmit={handleReset}>
                    <fieldset className="fieldset bg-gray-300 border-base-300 rounded-box w-xs border p-4">
                        <h1 className="font-bold text-3xl">Forget Password</h1>
                        <p className="font-extralight p-3 text-sm">
                            Enter your email and we’ll send you a reset link.
                        </p>

                        <label className="label">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="input text-gray-600"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <button
                            type="submit"
                            className="btn btn-neutral mt-4 hover:bg-black hover:text-white transition cursor-pointer"
                        >
                            Reset
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Reset;