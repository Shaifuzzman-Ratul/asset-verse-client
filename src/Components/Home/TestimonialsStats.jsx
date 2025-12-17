import React from "react";

const stats = [
    { value: "100+", label: "Companies Trust Us" },
    { value: "5,000+", label: "Assets Managed" },
    { value: "10,000+", label: "Employees Tracked" },
    { value: "99.9%", label: "System Uptime" },
];
const testimonials = [
    {
        name: "Operations Manager",
        company: "Technology Firm",
        feedback:
            "Asset Verse significantly improved how we manage assets and employee data. The system is fast, clean, and reliable.",
    },
    {
        name: "HR Executive",
        company: "Corporate Office",
        feedback:
            "Managing employees, attendance, and asset allocation is now seamless and well organized.",
    },
    {
        name: "IT Administrator",
        company: "Enterprise Organization",
        feedback:
            "A dependable platform with excellent access control and reporting features.",
    },
];

const TestimonialsStats = () => {
    return (
        <div data-aos="fade-down" > <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6">


                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-16">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
                        >
                            <h3 className="text-3xl font-extrabold text-green-600">
                                {stat.value}
                            </h3>
                            <p className="mt-2 text-gray-600 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>


                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Trusted by Professionals
                    </h2>
                    <p className="text-gray-600 mt-3">
                        What teams say about using Asset Verse
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                        >
                            <p className="text-gray-600 text-sm mb-6">
                                “{item.feedback}”
                            </p>

                            <div className="border-t pt-4">
                                <h4 className="font-semibold text-gray-800">
                                    {item.name}
                                </h4>
                                <span className="text-xs text-gray-500">
                                    {item.company}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section></div >
    );
};

export default TestimonialsStats;
