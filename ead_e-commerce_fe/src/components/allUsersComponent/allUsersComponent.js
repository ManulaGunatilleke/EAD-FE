import React, { useState } from 'react';
import './allUsersComponent.css';
import useAllUsers from '../../hooks/useViewAllUsers';
import useDeleteUser from '../../hooks/useUserDeleteByID';

export default function AllUsers() {

    const { users } = useAllUsers();
    const { onDeleteUser } = useDeleteUser();
    const [searchName, setSearchName] = useState('');
    const [searchUserType, setSearchUserType] = useState('');

    const filteredData = users.filter(user => {
        return (
            user.name.toLowerCase().includes(searchName.toLowerCase()) &&
            user.userType.toLowerCase().includes(searchUserType.toLowerCase()) &&
            user.userType !== 'Admin'
        );
    });

    // Function to delete a user
    const handleDeleteUser = async (users) => {
        const isDeleted = await onDeleteUser(users.userId);
        if (isDeleted) {
            alert("User has been deleted successfully!");
            window.location.href = '/allUsers';
        } else {
            alert("Error with user deletion, please try again later...");
        }
    }

    return (
        <>
            <div className="not-activate">
                <h1 className='notActiveh1'>Not Activate Accounts</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by Name"
                        value={searchName}
                        onChange={e => setSearchName(e.target.value)}
                    />
                    <select
                        value={searchUserType}
                        onChange={e => setSearchUserType(e.target.value)}
                    >
                        <option value="">All User Types</option>
                        <option value="Vendor">Vendor</option>
                        <option value="CSR">CSR</option>
                        <option value="Customer">Customer</option>
                    </select>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>User Type</th>
                            <th>Address</th>
                            <th>Username</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((user, index) => (  // Use filteredData instead of users
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.userType}</td>
                                <td>{user.address}</td>
                                <td>{user.username}</td>
                                <td>
                                    <button className='allUsersDeleteButton' onClick={() => handleDeleteUser(user)}>
                                        Delete Account
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}