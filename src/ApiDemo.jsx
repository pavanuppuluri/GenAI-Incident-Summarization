import React, { useState } from 'react';
import './App.css';

function ApiDemo() {
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
        // body: JSON.stringify({ prompt: inputValue }),
      });
      const data = await res.json();
      setResponse(data.response || JSON.stringify(data));
    } catch (err) {
      setResponse('Failed to fetch: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2><span className="highlight-blue">Incident Summarization</span> using Cohere</h2>
        <label htmlFor="input">Enter Input:</label>
        <textarea
          id="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Paste your case details here..."
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Summarizing...' : 'Submit'}
        </button>

        <label htmlFor="response" style={{ marginTop: '1.5rem' }}>Response:</label>
        <textarea
          id="response"
          className="response-box"
          readOnly
          value={response}
        />
      </div>
    </div>
  );
}

export default ApiDemo;
