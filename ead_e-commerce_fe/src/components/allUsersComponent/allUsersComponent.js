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
            <div className="allUser">
                <h1 className='allUser1'>All Users Accounts</h1>
                <div className="search-bar allUsersearch">
                    <input
                        className='allUserinput'
                        type="text"
                        placeholder="Search by Name"
                        value={searchName}
                        onChange={e => setSearchName(e.target.value)}
                    />
                    <select
                        className='allUserselect'
                        value={searchUserType}
                        onChange={e => setSearchUserType(e.target.value)}
                    >
                        <option value="">All User Types</option>
                        <option value="Vendor">Vendor</option>
                        <option value="CSR">CSR</option>
                        <option value="Customer">Customer</option>
                    </select>
                </div>
                <table className="data-table allusertable">
                    <thead>
                        <tr className='allusertr'>
                            <th className='alluserth'>Name</th>
                            <th className='alluserth'>Email</th>
                            <th className='alluserth'>Phone</th>
                            <th className='alluserth'>User Type</th>
                            <th className='alluserth'>Address</th>
                            <th className='alluserth'>Username</th>
                            <th className='alluserth'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((user, index) => (  // Use filteredData instead of users
                            <tr className='allusertr' key={index}>
                                <td className='allusertd'>{user.name}</td>
                                <td className='allusertd'>{user.email}</td>
                                <td className='allusertd'>{user.phone}</td>
                                <td className='allusertd'>{user.userType}</td>
                                <td className='allusertd'>{user.address}</td>
                                <td className='allusertd'>{user.username}</td>
                                <td className='allusertd'>
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