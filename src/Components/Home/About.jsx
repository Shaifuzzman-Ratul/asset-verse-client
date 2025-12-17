import React from "react";
import { FaChartLine, FaUsers, FaLock, FaClock } from "react-icons/fa";

const benefits = [
    {
        icon: <FaChartLine className="text-green-600 text-3xl" />,
        title: "Centralized Asset Management",
        description:
            "Easily track and manage all your digital and physical assets in one platform, reducing errors and saving time.",
    },
    {
        icon: <FaUsers className="text-green-600 text-3xl" />,
        title: "Employee & HR Management",
        description:
            "Manage employee records, attendance, and performance with a user-friendly interface.",
    },
    {
        icon: <FaLock className="text-green-600 text-3xl" />,
        title: "Secure & Reliable",
        description:
            "Role-based access control ensures your data is secure and only accessible to authorized personnel.",
    },
    {
        icon: <FaClock className="text-green-600 text-3xl" />,
        title: "Time-Saving Automation",
        description:
            "Automate asset assignment, HR approvals, and reporting to improve efficiency across your organization.",
    },
];

const About = () => {
    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6">


                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Why Choose Asset Verse
                    </h2>
                    <p className="text-gray-600 mt-3">
                        Empower your organization with a modern, secure, and intuitive platform for asset and employee management.
                    </p>
                </div>


                <div data-aos="fade-left" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center"
                        >
                            <div className="flex justify-center mb-4">{benefit.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
