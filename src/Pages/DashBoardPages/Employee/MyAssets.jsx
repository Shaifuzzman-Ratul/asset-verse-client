import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaPrint, FaUndo } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import Loader from "../../../Components/Loader/Loader";

const MyAssets = () => {
    const { user } = useContext(AuthContext);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");

    const { data: assets = [], isLoading } = useQuery({
        queryKey: ["assetRequest", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(
                `http://localhost:3000/assetRequest?email=${user.email}`
            );
            return res.data;
        },
    });


    const filteredAssets = assets.filter(asset => {
        const matchName = asset.assetName
            ?.toLowerCase()
            .includes(search.toLowerCase());

        const matchType = type ? asset.assetType === type : true;
        return matchName && matchType;
    });
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="p-6 bg-base-100 rounded-xl shadow">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-semibold">My Assigned Assets</h2>
                <div className="flex flex-wrap gap-3">
                    <input
                        type="text"
                        placeholder="Search asset"
                        className="input input-bordered"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className="select select-bordered"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">All Types</option>
                        <option value="returnable">Returnable</option>
                        <option value="not-returnable">Non-returnable</option>
                    </select>
                    <button
                        onClick={() => window.print()}
                        className="btn btn-outline gap-2"
                    >
                        <FaPrint /> Print
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Asset</th>
                            <th>Type</th>
                            <th>Company</th>
                            <th>Requested</th>
                            <th>Approved</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredAssets.map(asset => (
                            <tr key={asset._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={asset.assetImage}
                                            alt="asset"
                                            className="w-12 h-12 rounded-lg"
                                        />
                                        <span className="font-medium">{asset.assetName}</span>
                                    </div>
                                </td>

                                <td className="capitalize">{asset.assetType}</td>
                                <td>{asset.companyName}</td>

                                <td>
                                    {new Date(asset.requestDate).toLocaleDateString()}
                                </td>

                                <td>
                                    {asset.approvalDate
                                        ? new Date(asset.approvalDate).toLocaleDateString()
                                        : "-"}
                                </td>

                                <td>
                                    <span
                                        className={`badge ${asset.requestStatus === "approved"
                                            ? "badge-success"
                                            : asset.requestStatus === "returned"
                                                ? "badge-warning"
                                                : "badge-ghost"
                                            }`}
                                    >
                                        {asset.requestStatus}
                                    </span>
                                </td>

                                <td>
                                    {asset.requestStatus === "approved" &&
                                        asset.assetType === "returnable" && (
                                            <button className="btn btn-xs btn-warning gap-1">
                                                <FaUndo /> Return
                                            </button>
                                        )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredAssets.length === 0 && (
                    <p className="text-center text-gray-400 mt-6">
                        No assets found
                    </p>
                )}
            </div>
        </div>
    );
};

export default MyAssets;
