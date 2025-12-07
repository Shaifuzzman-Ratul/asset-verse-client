import React from 'react';

const HrRegister = () => {
    return (
        <div className='flex'>
            <div className="flex-1 bg-[url('https://i.ibb.co.com/pr3nSxyp/laptop-office-plant-black-background-top-view.jpg')] h-screen w-full bg-cover bg-center">

                {/* <img src="https://i.ibb.co.com/pr3nSxyp/laptop-office-plant-black-background-top-view.jpg" alt="" /> */}
            </div>
            <div className='flex-1'>
                <form >
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>

                </form>
            </div>
        </div>
    );
};

export default HrRegister;