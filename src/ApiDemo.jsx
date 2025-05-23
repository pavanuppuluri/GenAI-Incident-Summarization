import React, { useState } from 'react';
import './index.css';

const ApiDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('https://4wigvasicl.execute-api.us-east-1.amazonaws.com/dev?prompt='+inputValue, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputValue }),
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Incident Summarization using Cohere</h2>
        <label htmlFor="apiInput">Enter input</label>
        <textarea
          id="apiInput"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your input here..."
        />
        <button onClick={handleSubmit} disabled={loading || !inputValue}>
          {loading ? 'Calling API...' : 'Submit'}
        </button>
        {response && (
          <div className="response-box">
            <strong>Response:</strong>
            <pre>{response}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiDemo;
