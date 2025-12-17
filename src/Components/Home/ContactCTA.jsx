import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const ContactCTA = () => {
    return (
        <section className="bg-green-900 py-16 text-white mb-5">
            <div className="max-w-4xl mx-auto px-6 text-center">


                <h2 className="text-3xl font-bold mb-4">
                    Get in Touch with Asset Verse
                </h2>
                <p className="mb-8 text-green-100">
                    Have questions or want a demo? Our team is here to help you manage your assets and employees efficiently.
                </p>


                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a

                        className="flex items-center justify-center gap-2 bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
                    >
                        <FaEnvelope /> Email Us
                    </a>
                    <a

                        className="flex items-center justify-center gap-2 bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
                    >
                        <FaPhoneAlt /> Call Us
                    </a>
                </div>

                <p className="text-green-100 text-sm mt-6">
                    We aim to respond within 24 hours.
                </p>
            </div>
        </section>
    );
};

export default ContactCTA;
