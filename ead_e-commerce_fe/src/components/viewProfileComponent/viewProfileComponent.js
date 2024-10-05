import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'
import UserContext from '../../ContextComponent/ContextComponent';
import useViewUserById from '../../hooks/useUserViewByID'
import useUpdateUser from '../../hooks/useUpdateUserById';
import useDeleteUser from '../../hooks/useUserDeleteByID';
import useViewRatingByVendorId from '../../hooks/useViewRatingsByVendorId';
import './viewProfileComponent.css';

export default function ViewProfile() {
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({});
    const params = useParams();
    const userId = params.id;
    const { setUser} = useContext(UserContext);
    const { userData } = useViewUserById(userId);
    const { isUpdated, updateUser } = useUpdateUser();
    const { ratingData } = useViewRatingByVendorId(userId);
    const { onDeleteUser } = useDeleteUser();

    console.log(ratingData)

    // Calculate custom avgRating from ratingData
    const customAvgRating = ratingData?.length 
        ? (ratingData.reduce((acc, curr) => acc + (curr.ratingNo || 0), 0) / ratingData.length).toFixed(2) 
        : '0';

    useEffect(() => {
        if (isUpdated) {
            setIsEdit(false); 
        }
    }, [isUpdated]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditClick = () => {
        setFormData({
            ...userData,
            avgRating: customAvgRating > 0 ? customAvgRating : userData?.avgRating || ''
        }); 
        setIsEdit(true); 
    };

    const handleCancel = () => {
        setIsEdit(false); 
    };

    // Function to update a user
    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(userId, formData);
        alert('Profile updated successfully!'); 
        window.location.reload();
    };

    // Function to delete a user
    const handleDeleteUser = async (userId) => {
        const isDeleted = await onDeleteUser(userId);
        if (isDeleted) {
            alert("User has been deleted successfully!");
            setUser(null);
            localStorage.removeItem("user")
            window.location.href = '/';
        } else {
            alert("Error with user deletion, please try again later...");
        }
    }

    return (
        <>
            <div className='background-profile'>
                <h1 className='profileHeading'>Profile Page</h1>
                <div className="profile-container">
                    <div className="profile-card">
                        <div className="profile-row">
                            <div className="profile-image-section gradient-custom text-center">
                                <img
                                    src="https://as1.ftcdn.net/v2/jpg/03/38/30/80/1000_F_338308078_iiXC8b9lxpxmjGKaKu4dtXHSIVfzE8qm.jpg"
                                    alt="Avatar"
                                    className="profile-image"
                                />
                                <h5 className='profileName'>{userData?.name}</h5>
                                <p className='profileType'>{userData?.userType}</p>
                            </div>
                            <div className="profile-info-section">
                                <div className="profile-body">
                                    <h1>Information</h1>
                                    <hr />
                                    <div className="info-row">
                                        <div className="info-column">
                                            <h5>Name</h5>
                                            <p>{userData?.name}</p>
                                        </div>
                                        <div className="info-column">
                                            <h5>Phone</h5>
                                            <p>{userData?.phone}</p>
                                        </div>
                                    </div>
                                    <div className="info-row">
                                        <div className="info-column">
                                            <h5>Email</h5>
                                            <p>{userData?.email}</p>
                                        </div>
                                        <div className="info-column">
                                            <h5>User Type</h5>
                                            <p>{userData?.userType}</p>
                                        </div>
                                    </div>
                                    <div className="info-row">
                                        <div className="info-column">
                                            <h5>Address</h5>
                                            <p>{userData?.address}</p>
                                        </div>
                                        <div className="info-column">
                                            <h5>Username</h5>
                                            <p>{userData?.username}</p>
                                        </div>
                                    </div>
                                    <div className="info-row">
                                        <div className="info-column">
                                            <h5>Password</h5>
                                            <p>{'*'.repeat(userData?.password.length)}</p>
                                        </div>
                                        <div className="info-column">
                                            <h5>AvgRating</h5>
                                            <p>{customAvgRating > 0 ? customAvgRating : userData?.avgRating || '0'}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='p-1'>
                                            <button className='editbutton' onClick={handleEditClick}>Edit Profile</button>
                                        </div>
                                        <div className='p-1'>
                                            <button className='deletebutton' onClick={() => handleDeleteUser(userId)}>Delete Profile</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isEdit && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Profile</h2>
                        <form onSubmit={handleSubmit} className='editprofileform'>
                            <div className="form-group editprofilegroup">
                                <label className='editprofilelabel'>Name</label>
                                <input
                                    className='editprofileinput'
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group editprofilegroup">
                                <label className='editprofilelabel'>Phone</label>
                                <input
                                    className='editprofileinput'
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group editprofilegroup">
                                <label className='editprofilelabel'>Email</label>
                                <input
                                    className='editprofileinput'
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group editprofilegroup">
                                <label className='editprofilelabel'>User Type</label>
                                <input
                                    className='editprofileinput'
                                    type="text"
                                    name="userType"
                                    value={formData.userType}
                                    onChange={handleInputChange}
                                    readOnly
                                />
                            </div>
                            <div className="form-group editprofilegroup">
                                <label className='editprofilelabel'>Address</label>
                                <input
                                    className='editprofileinput'
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group editprofilegroup">
                                <label className='editprofilelabel'>Username</label>
                                <input
                                    className='editprofileinput'
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group editprofilegroup">
                                <label className='editprofilelabel'>Password</label>
                                <input
                                    className='editprofileinput'
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group editprofilegroup">
                                <label className='editprofilelabel'>AvgRating</label>
                                <input
                                    className='editprofileinput'
                                    type="number"
                                    name="avgRating"
                                    value={formData.avgRating}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button className='saveButton' type="submit">Save</button>
                            <button className='cancelButton' type="button" onClick={handleCancel}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
