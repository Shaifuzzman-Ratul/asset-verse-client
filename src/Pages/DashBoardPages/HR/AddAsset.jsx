import React, { use } from "react";
import { useForm, useWatch } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { imageUpload } from "../../../utils";
import toast from "react-hot-toast";

const AddAsset = () => {
    const { user } = use(AuthContext);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const handleFormSubmit = async (data) => {
        console.log(data);

        const imageFile = data.productImage?.[0];

        try {
            const imageURL = await imageUpload(imageFile);
            console.log(imageURL);
            toast.success("Successfully added")
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full p-10">
            <h1 className="text-4xl font-bold">Add New Asset</h1>
            <h4 className="text-gray-500 mb-6">Enter your asset details</h4>

            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-8 bg-white p-8 rounded-xl shadow-sm border"
            >
                {/* Product Type */}
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Product Type</label>

                    <div className="flex gap-6 items-center">
                        <div className="dropdown dropdown-right">
                            <div tabIndex={0} role="button" className="btn bg-green-200 m-1">Click to select</div>
                            <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li>
                                    <label className="cursor-pointer flex items-center gap-2">
                                        <input
                                            type="radio"
                                            {...register("assetType")}
                                            value="returnable"
                                            defaultChecked
                                        />
                                        Returnable
                                    </label></li>
                                <li> <label className="cursor-pointer flex items-center gap-2">
                                    <input
                                        type="radio"
                                        {...register("assetType")}
                                        value="not-returnable"
                                    />
                                    Not Returnable
                                </label></li>
                            </ul>
                        </div>



                    </div>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Name */}
                    <div className="flex flex-col">
                        <label className="font-bold">Product Name</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Product Name"
                            {...register("productName", { required: true })}
                        />
                        {errors.productName && (
                            <p className="text-red-500 text-sm mt-1">
                                Product name is required.
                            </p>
                        )}
                    </div>

                    {/* Product Quantity */}
                    <div className="flex flex-col">
                        <label className="font-bold">Product Quantity</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            placeholder="Quantity"
                            {...register("productQuantity", { required: true })}
                        />
                        {errors.productQuantity && (
                            <p className="text-red-500 text-sm mt-1">
                                Quantity is required.
                            </p>
                        )}
                    </div>
                </div>

                {/* Product Image */}
                <div className="flex flex-col">
                    <label className="font-bold">Product Image</label>
                    <input
                        {...register("productImage")}
                        type="file"
                        className="file-input file-input-bordered w-full"
                    />
                </div>

                {/* User Email */}
                <div className="flex flex-col">
                    <label className="font-bold">Your Email</label>
                    <input
                        type="email"
                        className="input input-bordered w-full"
                        defaultValue={user.email}
                        {...register("userEmail")}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="btn bg-green-700 hover:bg-green-800 text-white w-full md:w-auto px-6"
                >
                    Save to Collection
                </button>
            </form>
        </div>
    );
};

export default AddAsset;
