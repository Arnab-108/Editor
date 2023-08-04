import React, { useState } from 'react';
import './style.css'
import Editor from '@monaco-editor/react';
function App() {
const [code, setCode] = useState('');
const [convertedCode, setConvertedCode] = useState('');
const [language, setLanguage] = useState('');

const handleConvert = async () => {
  try {
    const response = await fetch('http://localhost:8080/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, language }),
    });

    const data = await response.json();
    setConvertedCode(data.convertedCode);
  } catch (error) {
    console.error('Error converting code:', error);
  }
};

return (
  <div className="container">
    <div className="left-section">
      <textarea
      height="90vh"
      //defaultLanguage="javascript"
      //defaultValue="// some comment"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder='Enter Code'
      />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="">Select Language</option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="c++">C++</option>
        <option value="java">Java</option>
        {/* Add more options for different languages */}
      </select>
      <button onClick={handleConvert}>Convert</button>
    </div>
    <div className="right-section">
      <pre>{convertedCode}</pre>
    </div>
  </div>
);
}


export default App;
