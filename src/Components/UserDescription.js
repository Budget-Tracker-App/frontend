// UserDescription.js
import React, { useState } from 'react';

const UserDescription = ({ onSubmit }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSubmit(description);
  };

  return (
    <div>
      <h2>For better results, please describe your spending habits:</h2>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a description"
      />
      {/* <button onClick={handleSubmit}>Submit</button> */}
    </div>
  );
};

export default UserDescription;
