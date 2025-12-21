import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { FaUsers, FaBirthdayCake } from "react-icons/fa";

const MyTeam = () => {
    const { user } = useContext(AuthContext);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3000/users");
            return res.data;
        },
    });
    const { data: myAffiliations = [], isLoading } = useQuery({
        queryKey: ["myAffiliations", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(
                `http://localhost:3000/employeeAffiliations?employeeEmail=${user.email}`
            );
            return res.data;
        },
    });

    const myCompanies = [...new Set(myAffiliations.map((a) => a.companyName))];
    const activeCompany = selectedCompany || myCompanies[0];


    const { data: companyMembers = [] } = useQuery({
        queryKey: ["companyMembers", activeCompany],
        enabled: !!activeCompany,
        queryFn: async () => {
            const res = await axios.get(
                `http://localhost:3000/employeeAffiliations?companyName=${activeCompany}`
            );
            return res.data;
        },
    });


    const teamMembers = companyMembers
        .filter((m) => m.employeeEmail !== user?.email)
        .map((m) => {
            const profile = users.find((u) => u.email === m.employeeEmail);
            return {
                name: profile?.employeeName || "Employee",
                email: m.employeeEmail,
                position: profile?.position || "Employee",
                profileImage:
                    profile?.employeeLogo || "https://i.ibb.co/2kR9zZS/user.png",
                dateOfBirth: profile?.dateOfBirth,
            };
        })

        .filter(
            (member, index, self) =>
                index === self.findIndex((m) => m.email === member.email)
        );


    const currentMonth = new Date().getMonth();
    const birthdays = teamMembers.filter(
        (member) =>
            member.dateOfBirth &&
            new Date(member.dateOfBirth).getMonth() === currentMonth
    );

    if (isLoading) {
        return (
            <p>Loading...</p>

        );
    }

    return (
        <div className="p-6 space-y-6 bg-gray-100">

            <div className="flex items-center gap-3">
                <FaUsers className="text-2xl text-primary" />
                <h1 className="text-2xl font-bold">My Team</h1>
            </div>

            <div className="card bg-base-100 shadow w-full md:w-1/3">
                <div className="card-body p-4">
                    <label className="font-semibold mb-2">Select Company</label>
                    <select
                        className="select select-bordered"
                        value={activeCompany || ""}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                    >
                        {myCompanies.map((company, idx) => (
                            <option key={idx} value={company}>
                                {company}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">
                        Team Members — {activeCompany}
                    </h2>

                    {teamMembers.length === 0 ? (
                        <p className="text-gray-500">No team members found.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {teamMembers.map((member, idx) => (
                                <div
                                    key={idx}
                                    className="card bg-base-100 shadow hover:shadow-md transition"
                                >
                                    <div className="card-body flex flex-row gap-4 items-center">
                                        <img
                                            src={member.profileImage}
                                            alt={member.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="font-bold">{member.name}</h3>
                                            <p className="text-sm text-gray-500">{member.position}</p>
                                            <p className="text-sm">{member.email}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <div className="card bg-base-100 shadow">
                        <div className="card-body">
                            <div className="flex items-center gap-2 mb-3">
                                <FaBirthdayCake className="text-xl text-secondary" />
                                <h2 className="font-semibold text-lg">Upcoming Birthdays</h2>
                            </div>

                            {birthdays.length === 0 ? (
                                <p className="text-gray-500 text-sm">No birthdays this month 🎉</p>
                            ) : (
                                <ul className="space-y-3">
                                    {birthdays.map((b, idx) => (
                                        <li key={idx} className="flex justify-between border-b pb-2">
                                            <span>{b.name}</span>
                                            <span className="text-sm text-gray-500">
                                                {new Date(b.dateOfBirth).toLocaleDateString()}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyTeam;
