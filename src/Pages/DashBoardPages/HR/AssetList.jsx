import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import Swal from 'sweetalert2';

const AssetList = () => {
    const { user } = React.useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentAsset, setCurrentAsset] = useState(null);

    const { data: allAsset = [], refetch } = useQuery({
        queryKey: ['allAsset', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/allAsset?email=${user.email}`);
            return res.data;
        }
    });

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/allAsset/${id}`).then(() => {
                    Swal.fire("Deleted!", "Your asset has been deleted.", "success");
                    refetch();
                });
            }
        });
    };

    const openModal = (asset) => {
        setCurrentAsset(asset);
        document.getElementById(`import_modal_${asset._id}`).showModal();
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedAsset = {
            productName: form.product.value,
            assetImage: form.image.value,
            productQuantity: form.quantity.value,
            assetType: form.type.value
        };
        console.log(updatedAsset);
        try {
            axios.put(`http://localhost:3000/allAsset/${currentAsset._id}`, updatedAsset);
            Swal.fire("Updated!", "Asset has been updated.", "success");
            refetch();
            document.getElementById(`import_modal_${currentAsset._id}`).close();
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Something went wrong while updating.", "error");
        } document.getElementById(`import_modal_${currentAsset._id}`).close();
    };

    const filteredAssets = allAsset.filter(asset =>
        asset.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="m-6">
                <input
                    type="text"
                    placeholder="Search assets"
                    className="input input-bordered w-full md:w-1/3"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAssets.length === 0 ? <p className='text-xl p-1 font-bold text-red-400'>No data Avaliable</p> :

                            filteredAssets.map((asset, index) => (
                                <tr key={asset._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={asset.assetImage} alt="Avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{asset.productName}</div>
                                                <div className="text-sm opacity-50">{asset.companyName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{asset.assetType}</td>
                                    <td>{asset.productQuantity}</td>
                                    <th>{new Date(asset.createAt).toLocaleDateString()}</th>
                                    <th onClick={() => openModal(asset)} className="mx-2 btn btn-square hover:bg-green-200">
                                        <FaEdit />
                                    </th>
                                    <dialog id={`import_modal_${asset._id}`} className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <h3 className="font-bold text-lg mb-4">Edit Product</h3>
                                            <form onSubmit={handleUpdate}>
                                                <label>Product Name</label>
                                                <input
                                                    name="product"
                                                    type="text"
                                                    defaultValue={currentAsset?.productName}
                                                    className="input input-bordered w-full mb-4"
                                                    required
                                                />
                                                <label>Product Image</label>
                                                <input
                                                    name="image"
                                                    type="text"
                                                    defaultValue={currentAsset?.assetImage}
                                                    className="input input-bordered w-full mb-4"
                                                    required
                                                />
                                                <label>Quantity</label>
                                                <input
                                                    name="quantity"
                                                    type="number"
                                                    defaultValue={currentAsset?.productQuantity}
                                                    className="input input-bordered w-full mb-4"
                                                    required
                                                />
                                                <label>Asset Type</label>
                                                <input
                                                    name="type"
                                                    type="text"
                                                    defaultValue={currentAsset?.assetType}
                                                    className="input input-bordered w-full mb-4"
                                                    required
                                                />
                                                <button type="submit" className="btn bg-green-700 text-white w-full">Update</button>
                                            </form>
                                        </div>
                                    </dialog>
                                    <th onClick={() => handleDelete(asset._id)} className="btn btn-square hover:bg-red-300">
                                        <MdDeleteForever />
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetList;
