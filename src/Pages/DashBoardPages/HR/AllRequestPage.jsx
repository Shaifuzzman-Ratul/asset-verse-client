import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';

const AllRequestsPage = () => {
    const { user } = use(AuthContext)
    const { data: assetRequests = [], refetch } = useQuery({
        queryKey: ['allRequests'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/assetRequest');
            return res.data;
        },
    });

    const hrMail = user.email;
    const { data: allUser = [] } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/users?email=${user.email}`);

            return res.data;
        }
    })



    const handleApprove = async (request) => {
        await axios.put(`http://localhost:3000/assetRequest/${request._id}`, {
            requestStatus: 'approved',
            approvalDate: new Date(),
            processedBy: hrMail,
        });
        const res = await axios.get(`http://localhost:3000/employeeAffiliations?hrEmail=${hrMail}`);
        const affiliations = res.data;
        const existing = affiliations.find(
            (aff) => aff.employeeEmail === request.requesterEmail && aff.hrEmail === user.email
        );
        if (!existing) {
            await axios.post('http://localhost:3000/employeeAffiliations', {
                employeeEmail: request.requesterEmail,
                employeeName: request.requesterName,
                hrEmail: user.email,
                companyName: request.companyName,
                companyLogo: allUser[0].companyLogo,
            });
        }
        toast.success('Request approved');
        refetch();
    };

    const handleReject = async (request) => {
        await axios.put(`http://localhost:3000/assetRequest/${request._id}`, {
            requestStatus: 'Rejected',
            approvalDate: new Date(),
            processedBy: hrMail,
        });
        toast.error('Request rejected');
        refetch();
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">All Employee Asset Requests</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Employee</th>
                            <th>Email</th>
                            <th>Asset</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assetRequests.map((req, index) => (
                            <tr key={req._id}>
                                <th>{index + 1}</th>
                                <td>{req.requesterName || 'N/A'}</td>
                                <td>{req.requesterEmail}</td>
                                <td>{req.assetName}</td>
                                <td>{req.assetType}</td>
                                <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                                <td>{req.requestStatus}</td>
                                <td className="flex gap-2">
                                    {req.requestStatus === 'pending' && (
                                        <>
                                            <button
                                                className="btn btn-success btn-xs"
                                                onClick={() => handleApprove(req)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="btn btn-error btn-xs"
                                                onClick={() => handleReject(req)}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllRequestsPage;
