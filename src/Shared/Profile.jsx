import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Components/Loader/Loader";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email;

    const [dbUser, setDbUser] = useState(null);
    const [name, setName] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (!email) return;

        axios
            .get(`http://localhost:3000/users?email=${email}`)
            .then((res) => {
                const data = res.data[0];
                setDbUser(data);
                setName(data.hrName || data.employeeName || "");
                setProfileImage(data.companyLogo || data.employeeLogo || "");
            })
            .catch((err) => console.error("Failed to load user profile", err));
    }, [email]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async () => {
        if (!dbUser) return;

        setIsUpdating(true);

        try {
            await axios.patch(
                `http://localhost:3000/users/${dbUser._id}`,
                {
                    name,
                    profileImage
                }
            );

            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Failed to update profile");
            console.error(error);
        }
        setIsUpdating(false);

    };


    if (!dbUser) {
        return (
            <div className="flex justify-center items-center h-64 bg-gray-100">
                <Loader />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 ">
            <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
                My Profile
            </h1>

            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6">

                <div className="flex flex-col items-center gap-4">
                    <div className="w-32 h-32 rounded-full border-4 border-green-600 overflow-hidden">
                        <img
                            src={profileImage || "https://i.ibb.co/pv1JCj0X/user.png"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <label className="btn btn-sm btn-ghost w-full max-w-xs cursor-pointer bg-green-300">
                        Upload Image
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden bg-green-500" />
                    </label>
                </div>

                {/* Info Form */}
                <div className="flex-1 flex flex-col gap-4">

                    <div>
                        <label className="text-gray-600 font-semibold mb-1 block">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>


                    <div>
                        <label className="text-gray-600 font-semibold mb-1 block">Email</label>
                        <input
                            type="email"
                            value={dbUser.email}
                            readOnly
                            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Company Info  */}
                    {dbUser.companyName && (
                        <div>
                            <label className="text-gray-600 font-semibold mb-1 block">Company</label>
                            <div className="flex items-center gap-3 mt-1">
                                <img
                                    src={dbUser.companyLogo || "https://i.ibb.co/pv1JCj0X/user.png"}
                                    alt={dbUser.companyName}
                                    className="w-10 h-10 object-cover rounded"
                                />
                                <span className="text-gray-700 font-medium">{dbUser.companyName}</span>
                            </div>
                        </div>
                    )}


                    <button
                        onClick={handleUpdate}
                        disabled={isUpdating}
                        className="btn btn-green bg-green-700 text-white mt-4 w-40 self-start"
                    >
                        {isUpdating ? "Updating..." : "Update Profile"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
