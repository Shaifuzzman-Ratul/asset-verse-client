import axios from 'axios';
import React, { use, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import { useQuery } from '@tanstack/react-query';

// const dummyAssets = [
//     {
//         productName: "Laptop",
//         assetImage: "https://i.ibb.co/kswjv0Xw/Screenshot-2025-03-17-220700.png",
//         assetType: "returnable",
//         availableQuantity: 5,
//     },
//     {
//         productName: "Mouse",
//         assetImage: "https://i.ibb.co/39MrQZ0L/Screenshot-2025-09-18-125656.png",
//         assetType: "non-returnable",
//         availableQuantity: 10,
//     },
//     {
//         productName: "Keyboard",
//         assetImage: "https://i.ibb.co/XYZ/keyboard.png",
//         assetType: "returnable",
//         availableQuantity: 7,
//     },
//     {
//         productName: "Monitor",
//         assetImage: "https://i.ibb.co/XYZ/monitor.png",
//         assetType: "returnable",
//         availableQuantity: 3,
//     },
// ];

const RequestAsset = () => {
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [note, setNote] = useState("");

    const openModal = (asset) => {
        setSelectedAsset(asset);
    };

    const closeModal = () => {
        setSelectedAsset(null);
        setNote("");
    };

    const handleRequestSubmit = (e) => {
        e.preventDefault();
        console.log({
            asset: selectedAsset,
            note,
            status: "pending",
        });
        alert(`Request submitted for ${selectedAsset.productName}`);
        closeModal();
    };

    const { data: allAsset = [], refetch } = useQuery({
        queryKey: ['allAsset'], // no email key
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/allAsset'); // no ?email=
            return res.data;
        }
    });

    console.log(allAsset);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Available Assets</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allAsset.length === 0 ? <p className='text-xl font-bold text-red-400'>No data available</p> : allAsset.map((asset, index) => (
                    <div key={index} className="bg-gray-100 shadow-md rounded-lg p-4 flex flex-col items-center">
                        <img
                            src={asset.assetImage}
                            alt={asset.productName}
                            className="h-32 w-full object-cover rounded-md mb-4"
                        />
                        <h2 className="text-xl font-semibold">{asset.productName}</h2>
                        <p className="text-gray-500 capitalize">{asset.assetType}</p>
                        <p className="font-bold mt-2">Available: {asset.productQuantity}</p>
                        <button
                            className="mt-4 btn bg-green-800 text-white w-full"
                            onClick={() => openModal(asset)}
                        >
                            Request
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedAsset && (
                <dialog open className="modal">
                    <div className="modal-box relative">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                        <h3 className="text-lg font-bold mb-4">Request Asset</h3>
                        <form onSubmit={handleRequestSubmit} className="flex flex-col gap-4">
                            <p>
                                Asset: <span className="font-semibold">{selectedAsset.productName}</span>
                            </p>
                            <label>
                                Note:
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Add a note (optional)"
                                    className="input input-bordered w-full h-24 mt-1"
                                />
                            </label>
                            <button type="submit" className="btn btn-success w-full">
                                Submit Request
                            </button>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default RequestAsset;
