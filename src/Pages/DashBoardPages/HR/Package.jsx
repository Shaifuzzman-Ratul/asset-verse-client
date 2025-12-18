import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const Package = () => {
    const { data: packages = [], isLoading } = useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3000/packages");
            return res.data;
        },
    });

    if (isLoading) {
        return <p className="text-center py-10">Loading packages...</p>;
    }

    return (
        <div className='max-w-7xl mx-auto px-6 mb-10 pt-12 grid gap-6 md:grid-cols-3 sm:grid-cols-1'>

            {packages.map((pkg, index) => (
                <div data-aos="fade-up-left" key={index} className="card w-full bg-base-100 shadow-sm">
                    <div className="card-body">
                        {
                            pkg.name === "Premium" ?
                                <span className="badge badge-xs badge-warning">Most Popular</span> : ''
                        }
                        <div className="flex justify-between mt-2">
                            <h2 className="text-2xl font-bold">{pkg.name}</h2>
                            <span className="text-xl font-bold">${pkg.price}/mo</span>
                        </div>
                        <p className="mt-1 text-gray-500">Employees: {pkg.employeeLimit}</p>
                        <ul className="mt-4 flex flex-col gap-2 text-sm">
                            {pkg.features.map((feature, i) => (
                                <li key={i} className={i >= 3 ? "opacity-50 line-through" : ""}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4">
                            <button className="btn btn-primary bg-green-700 btn-block border-none">Subscribe</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Package;
