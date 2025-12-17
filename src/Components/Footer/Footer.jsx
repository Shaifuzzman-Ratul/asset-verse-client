import React from "react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="bg-[#113d3c] text-white pt-10">
            <footer className="footer sm:footer-horizontal p-10">

                {/* Services */}
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Asset Management</a>
                    <a className="link link-hover">Employee Management</a>
                    <a className="link link-hover">HR Management</a>
                    <a className="link link-hover">Asset Tracking</a>
                </nav>

                {/* Quick Navigation */}
                <nav>
                    <h6 className="footer-title">Quick Navigation</h6>
                    <a className="link link-hover">Home</a>
                    <a className="link link-hover">About Us</a>
                    <a className="link link-hover">Assets</a>
                    <a className="link link-hover">Contact</a>
                </nav>

                {/* Company Info */}
                <nav className="max-w-sm">
                    <span className="text-3xl font-extrabold">
                        ASSET<span className="text-green-600">VERSE</span>
                    </span>
                    <p className="mt-2 text-sm">
                        Asset Verse is a modern web platform for managing, showcasing, and
                        organizing digital and physical assets efficiently in one place.
                    </p>

                    {/* Contact Info */}
                    <div className="mt-4 text-sm">
                        <p>Email: support@assetverse.com</p>
                        <p>Phone: +880 1XXXXXXXXX</p>
                        <p>Address:Saver, Dhaka-1216, Bangladesh</p>
                    </div>

                    {/* Social */}
                    <h6 className="footer-title mt-4">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        <a className="cursor-pointer"><FaXTwitter /></a>
                        <a className="cursor-pointer"><FaYoutube /></a>
                        <a className="cursor-pointer"><FaFacebook /></a>
                    </div>
                </nav>
            </footer>


            <div className="text-center py-4 border-t bg-green-800 border-gray-600 text-sm">
                © {new Date().getFullYear()} Asset Verse. All rights reserved.
            </div>
        </div>
    );
};

export default Footer;
