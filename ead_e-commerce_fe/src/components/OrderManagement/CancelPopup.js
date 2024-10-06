import React, { useState } from 'react';
import './CancelPopup.css';

const CancelPopup = ({ onCancel, onSubmit }) => {
  const [cancellationNote, setCancellationNote] = useState("");

  const handleSubmit = () => {
    if (cancellationNote) {
      onSubmit(cancellationNote);
    } else {
      alert("Please enter a cancellation note.");
    }
  };

  return (
    <div className="cancel-popup-overlay">
      <div className="cancel-popup">
        <h2>Cancel Order</h2>
        <textarea
          value={cancellationNote}
          onChange={(e) => setCancellationNote(e.target.value)}
          placeholder="Enter cancellation note"
          rows="4"
          cols="50"
        />
        <div className="popup-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CancelPopup;
