import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MultiSelectDropdown from './MultiSelectDropdown';
import ResponseData from './ResponseData';
import './App.css';  // Add a CSS file for better styling

function App() {
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    // Set the document title to your roll number
    document.title = "21BAI1852";
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const jsonData = JSON.parse(input);

      // Validate JSON
      if (typeof jsonData !== 'object' || Array.isArray(jsonData) || !jsonData.data || !Array.isArray(jsonData.data)) {
        throw new Error('Invalid JSON format. Ensure it is an object with a "data" field that contains an array.');
      }

      // Make API call
      try {
        const response = await axios.post('https://bajaj-finserv-backend-dr91.onrender.com/bfhl', jsonData);
        setResponse(response.data);
        setError(null);
      } catch (error) {
        if (error.response) {
          setError(error.response.data);
        } else if (error.request) {
          setError("No response received from server.");
        } else {
          setError("Error: " + error.message);
        }
        setResponse(null);
      }

    } catch (error) {
      setError('Invalid JSON input');
    }
  };

  return (
    <div className="container">
      <h1>21BAI1852</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder='Enter JSON input (e.g. {"data":["M","1","334","4","B"]})'
        />
        <button type="submit">Submit</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      {response && (
        <div className="response-section">
          <MultiSelectDropdown
            options={[
              { value: 'alphabets', label: 'Alphabets' },
              { value: 'numbers', label: 'Numbers' },
              { value: 'highestLowercaseAlphabet', label: 'Highest lowercase alphabet' },
            ]}
            selectedOptions={selectedOptions}
            onChange={(options) => setSelectedOptions(options)}
          />
          <ResponseData response={response} selectedOptions={selectedOptions} />
        </div>
      )}
    </div>
  );
}

export default App;
