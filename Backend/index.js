const express = require('express');
const axios = require('axios');
const cors = require("cors")

const app = express();
const PORT = 8080; // or any other port you prefer
require('dotenv').config();
app.use(express.json());
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Hello!")
})


app.post('/convert', async (req, res) => {
    try {
      const { code, language } = req.body;
      
      // Your ChatGPT API key
      const apiKey = process.env.OPENAI_API_KEY;
      
      // API endpoint for ChatGPT
      const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
      
      // Prepare the headers for the API request
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      };
  
      // Construct the payload to be sent to the API
      const payload = {
        prompt: `Convert the ${code} in ${language} language`,
        max_tokens: 150,
      };
  
      // Make the API request using axios
      const response = await axios.post(apiUrl, payload, { headers });
      
      // Extract the converted code from the API response
      const convertedCode = response.data.choices[0].text;
  
      res.json({ convertedCode });
    } catch (error) {
      console.error('Error converting code:', error.message);
      res.status(500).json({ error: 'Failed to convert code' });
    }
  });

  app.post('/debug', async (req, res) => {
    try {
      const { code} = req.body;
      
      // Your ChatGPT API key
      const apiKey = process.env.OPENAI_API_KEY;
      
      // API endpoint for ChatGPT
      const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
      
      // Prepare the headers for the API request
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      };
  
      // Construct the payload to be sent to the API
      const payload = {
        prompt: `Debug the following code:\n${code}`,
        max_tokens: 150,
      };
  
      // Make the API request using axios
      const response = await axios.post(apiUrl, payload, { headers });
      
      // Extract the converted code from the API response
      const debuggedCode = response.data.choices[0].text;
  
      res.json({ debuggedCode });
    } catch (error) {
      console.error('Error converting code:', error.message);
      res.status(500).json({ error: 'Failed to convert code' });
    }
  });

  app.post('/quality', async (req, res) => {
    try {
      const { code} = req.body;
      
      // Your ChatGPT API key
      const apiKey = process.env.OPENAI_API_KEY;
      
      // API endpoint for ChatGPT
      const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
      
      // Prepare the headers for the API request
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      };
  
      // Construct the payload to be sent to the API
      const payload = {
        prompt: `Do a quality check the following code:\n${code}`,
        max_tokens: 150,
      };
  
      // Make the API request using axios
      const response = await axios.post(apiUrl, payload, { headers });
      
      // Extract the converted code from the API response
      const qualityCode = response.data.choices[0].text;
  
      res.json({ qualityCode });
    } catch (error) {
      console.error('Error converting code:', error.message);
      res.status(500).json({ error: 'Failed to convert code' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});