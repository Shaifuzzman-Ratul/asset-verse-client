import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { use } from 'react';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';

const AssetList = () => {
    const { user } = use(AuthContext)

    const { data: allAsset = [] } = useQuery({
        queryKey: ['allAsset', user?.email],
        // enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/allAsset?email=${user.email}`);

            return res.data;
        }
    })
    console.log('data', allAsset);


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    No
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allAsset.map((asset, index) =>
                            <tr key={asset._id} >
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={asset.assetImage}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{asset.productName}</div>
                                            <div className="text-sm opacity-50">{asset.assetType}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {asset.assetType}

                                </td>
                                <td>{asset.productQuantity}</td>
                                <th>
                                    {new Date(asset.createAt).toLocaleDateString()
                                    }
                                </th>
                            </tr>
                        )}
                        {/* row 1 */}


                    </tbody>
                    {/* foot */}
                    <tfoot>

                    </tfoot>
                </table>
            </div>

        </div>
    );
};

export default AssetList;