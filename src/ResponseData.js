import React from 'react';
import './ResponseData.css';  // Create a CSS file for styling

const ResponseData = ({ response, selectedOptions }) => {
  const filteredResponse = {};

  selectedOptions.forEach((option) => {
    if (response[option]) {
      filteredResponse[option] = response[option];
    }
  });

  // Custom formatting for displaying the response
  return (
    <div className="response-data">
      {Object.keys(filteredResponse).map((key) => (
        <div key={key} className="response-item">
          <strong>{key}:</strong> {Array.isArray(filteredResponse[key]) ? filteredResponse[key].join(', ') : JSON.stringify(filteredResponse[key])}
        </div>
      ))}
    </div>
  );
};

export default ResponseData;
