import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

const Chatbot = () => {

  const username = sessionStorage.getItem('username');

  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('');

  const handleSummarize = () => {
    fetch(`http://192.168.1.7:5000/Chatbot?username=${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
    })
        .then(response => response.json())
        .then(data => {
            setResponse(data.response);
            setPrompt(data.prompt)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
  };

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <div>
      <TextField id="outlined-basic" label="Enter Your prompt here" variant="outlined" onChange={handleInputChange} />
      <br /><br />
      <Button onClick={handleSummarize} variant="contained" endIcon={<SendIcon />}>
        Summarize
      </Button>
      <br /><br />
      <h2>Prompt {prompt}</h2>
      <h2>Response:</h2>
      <p>{response}</p>
    </div>
  );
};

export default Chatbot;
