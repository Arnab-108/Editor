import React, { useState } from 'react';
import './style.css'
import Editor from '@monaco-editor/react';
function App() {
const [code, setCode] = useState('');
const [convertedCode, setConvertedCode] = useState('');
const [debug , setDebug] = useState('')
const [quality , setQuality] = useState('')
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

const handleDebug= async()=>{
  try {
    const response = await fetch('http://localhost:8080/debug', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code}),
    });

    const data = await response.json();
    setDebug(data.debuggedCode)
  } catch (error) {
    
  }
}

const handleQuality = async()=>{
  try {
    const response = await fetch('http://localhost:8080/quality', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code}),
    });

    const data = await response.json();
    console.log(data)
    setQuality(data.qualityCode)
  } catch (error) {
    console.error('Error Occured!:', error);
  }
}
 console.log(debug)
return (
  <>
    <div style={{display:"flex" , gap:"4vw" ,height:"6vh"}}>
          <select
          style={{marginLeft:"2vw", }}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">Select Language</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="c++">C++</option>
            <option value="c">C</option>
            <option value="java">Java</option>
            {/* Add more options for different languages */}
          </select>
        
          <button onClick={handleConvert}>Convert</button>
          <button onClick={handleDebug}>Debug</button>
          <button onClick={handleQuality}>Quality</button>
        </div>
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
        
      </div>
      <div className="right-section">
          <pre>Converted Code:{convertedCode }</pre>
          <pre>Debug: {debug}</pre>
          <pre>Quality Check: {quality} </pre>
      </div>
    </div>
  </>
);
}


export default App;
