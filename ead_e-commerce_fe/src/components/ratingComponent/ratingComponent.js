import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useViewRatingByVendorId from '../../hooks/useViewRatingsByVendorId';
import useDeleteRating from '../../hooks/useRatingDeleteById';
import './ratingComponent.css';

export default function ViewRating() {

    const params = useParams();
    const vendorId = params.id;
    const { ratingData } = useViewRatingByVendorId(vendorId);
    const { onDeleteRating } = useDeleteRating();
    const [ratingsData, setRatingsData] = useState([]);

    useEffect(() => {
        if (ratingData) {
            setRatingsData(ratingData);
        }
    }, [ratingData]);

    const handleDelete = async (ratingId, index) => {
        const isDeleted = await onDeleteRating(ratingId); 
        if (isDeleted) {
            alert("Rating has been deleted successfully!");
            window.location.reload();
            const newRatingsData = ratingsData.filter((_, i) => i !== index); 
            setRatingsData(newRatingsData);
        }
    };

    return (
        <>
            <h1 className='ratingHeading'>Rating Pages...</h1>
            <div className="rating-container">
                {ratingData && ratingData.length > 0 ? (
                    ratingData.map((rating, index) => (
                        <div className="rating-card" key={index}>
                            <div className="rating-content">
                                <h2>{rating?.name}</h2>
                                <p>{rating?.comment}</p>
                                <p>Rating: {rating?.ratingNo} / 5</p>
                            </div>
                            <br />
                            <i 
                                className="bi bi-trash3-fill trash-icon" 
                                onClick={() => handleDelete(rating?.ratingId, index)}
                            ></i>
                        </div>
                    ))
                ) : (
                    <p>No ratings available.</p>
                )}
            </div>
        </>
    )
}