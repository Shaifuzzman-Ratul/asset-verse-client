import React, { useState } from 'react';

const MyTeam = () => {
    const [selectedCompany, setSelectedCompany] = useState('Acme Corp');

    // Static company list
    const companies = ['Acme Corp', 'Globex Inc', 'Initech'];

    // Static employees
    const employees = [
        { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Developer', photo: 'https://via.placeholder.com/150', company: 'Acme Corp' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', position: 'Designer', photo: 'https://via.placeholder.com/150', company: 'Acme Corp' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', position: 'Manager', photo: 'https://via.placeholder.com/150', company: 'Globex Inc' },
        { id: 4, name: 'Alice Cooper', email: 'alice@example.com', position: 'HR', photo: 'https://via.placeholder.com/150', company: 'Initech' },
    ];

    // Static birthdays this month
    const birthdays = [
        { id: 1, name: 'Alice Cooper', date: '2025-12-15', company: 'Initech' },
        { id: 2, name: 'Mark Twain', date: '2025-12-22', company: 'Acme Corp' },
    ];

    // Filter employees by selected company
    const filteredEmployees = employees.filter(emp => emp.company === selectedCompany);

    // Filter birthdays by selected company
    const filteredBirthdays = birthdays.filter(b => b.company === selectedCompany);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">My Team</h1>

            {/* Company Selector */}
            <div className="mb-6">
                <label className="mr-2 font-semibold">Select Company:</label>
                <select
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="border p-2 rounded"
                >
                    {companies.map((company, idx) => (
                        <option key={idx} value={company}>{company}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Employee List */}
                <div className="md:col-span-2">
                    <h2 className="text-xl font-bold mb-4">{selectedCompany} - Employees</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {filteredEmployees.map(emp => (
                            <div key={emp.id} className="border p-4 rounded shadow flex items-center gap-4 bg-white">
                                <img
                                    src={emp.photo}
                                    alt={emp.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold">{emp.name}</h3>
                                    <p className="text-sm text-gray-600">{emp.position}</p>
                                    <p className="text-sm text-gray-500">{emp.email}</p>
                                </div>
                            </div>
                        ))}
                        {filteredEmployees.length === 0 && <p>No employees found for this company.</p>}
                    </div>
                </div>

                {/* Upcoming Birthdays */}
                <div className="md:col-span-1">
                    <h2 className="text-xl font-bold mb-4">Upcoming Birthdays</h2>
                    <div className="border p-4 rounded shadow bg-white">
                        {filteredBirthdays.length === 0 ? (
                            <p>No birthdays this month.</p>
                        ) : (
                            <ul className="space-y-2">
                                {filteredBirthdays.map(b => (
                                    <li key={b.id}>
                                        <span className="font-semibold">{b.name}</span> - {new Date(b.date).toLocaleDateString()}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyTeam;
