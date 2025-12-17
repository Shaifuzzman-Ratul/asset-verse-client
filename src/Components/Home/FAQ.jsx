import Aos from "aos";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";



const faqs = [
    {
        question: "What is Asset Verse?",
        answer:
            "Asset Verse is a web-based platform designed to manage company assets, employees, and HR operations efficiently from a single dashboard.",
    },
    {
        question: "Who can use Asset Verse?",
        answer:
            "Asset Verse is suitable for startups, small businesses, and enterprises looking to manage assets, employees, and HR processes securely.",
    },
    {
        question: "Does Asset Verse support asset assignment to employees?",
        answer:
            "Yes. You can assign digital and physical assets to employees and track ownership, usage, and return history in real time.",
    },
    {
        question: "Is employee and asset data secure?",
        answer:
            "Absolutely. Asset Verse uses role-based access control and follows best practices to ensure data security and privacy.",
    },
    {
        question: "Can HR teams manage attendance and leave?",
        answer:
            "Yes. HR teams can manage employee attendance, leave requests, and approvals directly through the platform.",
    },
    {
        question: "Is Asset Verse cloud-based?",
        answer:
            "Yes. Asset Verse is a cloud-based solution, allowing access anytime and from anywhere with proper authorization.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div data-aos="fade-up"> <section className="bg-white py-16 " >
            <div className="max-w-4xl mx-auto px-6">


                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 mt-3">
                        Everything you need to know about Asset Verse
                    </p>
                </div>


                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border rounded-xl p-5 cursor-pointer hover:shadow-md transition"
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium text-gray-800">
                                    {faq.question}
                                </h3>
                                <FaChevronDown
                                    className={`text-gray-500 transition-transform ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </div>

                            {openIndex === index && (
                                <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                                    {faq.answer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section></div>
    );
};

export default FAQ;
