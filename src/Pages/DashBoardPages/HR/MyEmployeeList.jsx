import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import Loader from "../../../Components/Loader/Loader";
import Swal from "sweetalert2";

const MyEmployeeList = () => {
    const { user } = useContext(AuthContext);
    const hrEmail = user?.email;


    const { data: employees = [], refetch, isLoading } = useQuery({
        queryKey: ["employees", hrEmail],
        enabled: !!hrEmail,
        queryFn: async () => {
            const res = await axios.get(
                `http://localhost:3000/employeeAffiliations?hrEmail=${hrEmail}`
            );
            return res.data;
        },
    });


    const { data: assetRequests = [] } = useQuery({
        queryKey: ["assetRequests"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/assetRequest`);
            return res.data;
        },
    });


    const handleRemove = (employee) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {  // <-- make this async
            if (result.isConfirmed) {
                try {
                    await axios.delete(
                        `http://localhost:3000/employeeAffiliations/${employee._id}`
                    );
                    toast.success("Employee removed from team");
                    refetch();
                    Swal.fire(
                        "Deleted!",
                        "Employee has been removed.",
                        "success"
                    );
                } catch (error) {
                    toast.error("Failed to remove employee");
                    console.error(error);
                }
            }
        });
    };


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader />
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4">My Employee List</h1>

            <p className="mb-4 font-semibold">{employees.length} employees connected.</p>

            <div className="overflow-x-auto w-full">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Join Date</th>
                            <th>Assets Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center text-gray-500">
                                    No employees connected.
                                </td>
                            </tr>
                        )}

                        {employees.map((emp) => {
                            const assetsCount = assetRequests.filter(
                                (req) =>
                                    req.requesterEmail === emp.employeeEmail &&
                                    req.requestStatus === "approved"
                            ).length;

                            return (
                                <tr key={emp._id}>
                                    <td>
                                        <img
                                            src={emp.profileImage || "https://i.ibb.co/2kR9zZS/user.png"}
                                            alt={emp.employeeName}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    </td>
                                    <td>{emp.employeeName}</td>
                                    <td>{emp.employeeEmail}</td>
                                    <td>
                                        {emp.affiliationDate
                                            ? new Date(emp.affiliationDate).toLocaleDateString()
                                            : "N/A"}
                                    </td>
                                    <td>{assetsCount}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => handleRemove(emp)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEmployeeList;
