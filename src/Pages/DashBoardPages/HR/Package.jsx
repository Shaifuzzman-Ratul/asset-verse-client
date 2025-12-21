import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import Loader from "../../../Components/Loader/Loader";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const Package = () => {
    const { user } = useContext(AuthContext);

    // Fetch packages
    const { data: packages = [], isLoading } = useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3000/packages");
            return res.data;
        },
    });

    // Fetch users
    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3000/users");
            return res.data;
        },
    });

    const currentUser = user && users.find(u => u.email === user.email);
    const role = currentUser?.role;

    if (isLoading) {
        return <Loader />;
    }


    const handlePayment = async (pkg) => {
        if (!user) {
            return;
        }
        try {
            const paymentInfo = {
                packageId: pkg._id,
                hrmail: user.email,
            };
            const res = await axios.post(
                "http://localhost:3000/create-checkout-session",
                paymentInfo
            );

            // window.location.href = res.data.url;
            window.location.assign(res.data.url);

        } catch (error) {
            console.error(error);
            alert("Payment failed. Try again.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 mb-10 pt-12 grid gap-6 md:grid-cols-3 sm:grid-cols-1">
            {packages.map(pkg => (
                <div
                    key={pkg._id}
                    data-aos="fade-up-left"
                    className="card w-full bg-base-100 shadow-sm"
                >
                    <div className="card-body">
                        {pkg.name === "Premium" && (
                            <span className="badge badge-xs badge-warning">
                                Most Popular
                            </span>
                        )}

                        <div className="flex justify-between mt-2">
                            <h2 className="text-2xl font-bold">{pkg.name}</h2>
                            <span className="text-xl font-bold">
                                ${pkg.price}/mo
                            </span>
                        </div>

                        <p className="mt-1 text-gray-500">
                            Employees: {pkg.employeeLimit}
                        </p>

                        <ul className="mt-4 flex flex-col gap-2 text-sm">
                            {pkg.features.map((feature, i) => (
                                <li key={i} className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 mr-2 text-green-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6">
                            {user && role === "hr" && pkg.name === "Basic" ? (
                                <button

                                    className="btn btn-block  bg-green-800 text-white border-none"
                                >
                                    Current Package
                                </button>
                            ) : (
                                <button
                                    onClick={() => handlePayment(pkg)}
                                    className="btn btn-block bg-green-800 text-white border-none"
                                >
                                    Subscribe
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Package;
