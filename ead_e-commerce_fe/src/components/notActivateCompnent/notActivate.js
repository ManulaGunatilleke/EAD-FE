import React, { useState } from 'react';
import './notActivate.css';
import useAllUsers from '../../hooks/useViewAllUsers';
import useAccountActivate from '../../hooks/useAccountActivate';

export default function NotActivate() {
    const { users } = useAllUsers();
    const { activateAccount } = useAccountActivate();
    const [searchName, setSearchName] = useState('');
    const [searchUserType, setSearchUserType] = useState('');

    const filteredData = users.filter(user => {
        return (
            user.accountStatus === 'NotActivate' &&  // Filter for NotActivate users
            user.name.toLowerCase().includes(searchName.toLowerCase()) &&
            user.userType.toLowerCase().includes(searchUserType.toLowerCase())
        );
    });

    const handleActivate = async (userId) => {
        const success = await activateAccount(userId);
        if (success) {
            alert("User activated successfully");
            window.location.reload();
        } else {
            alert("Activation failed.");
        }
    };

    return (
        <div className="not-activate">
            <h1 className='notActiveh1'>Not Activate Accounts</h1>
            <div className="search-bar">
                <input
                    className='searchbarinput'
                    type="text"
                    placeholder="Search by Name"
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                />
                <select
                    className='searchbarselect'
                    value={searchUserType}
                    onChange={e => setSearchUserType(e.target.value)}
                >
                    <option value="">All User Types</option>
                    <option value="Vendor">Vendor</option>
                    <option value="CSR">CSR</option>
                    <option value="Customer">Customer</option>
                </select>
            </div>
            <table className="data-table notactivatetable">
                <thead>
                    <tr className='notactivatetr'>
                        <th className='notactivateth'>Name</th>
                        <th className='notactivateth'>Email</th>
                        <th className='notactivateth'>Phone</th>
                        <th className='notactivateth'>User Type</th>
                        <th className='notactivateth'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((user, index) => (  // Use filteredData instead of users
                        <tr className='notactivatetr' key={index}>
                            <td className='notactivatetd'>{user.name}</td>
                            <td className='notactivatetd'>{user.email}</td>
                            <td className='notactivatetd'>{user.phone}</td>
                            <td className='notactivatetd'>{user.userType}</td>
                            <td className='notactivatetd'>
                                <button className='activeButton' onClick={() => handleActivate(user.userId)}>
                                    Activate
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
