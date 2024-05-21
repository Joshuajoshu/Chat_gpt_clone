import React, { useState, useEffect } from 'react';

const Chat_history = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const username = sessionStorage.getItem('username');

  useEffect(() => {
    fetchChatHistory();
    const intervalId = setInterval(fetchChatHistory, 1000);
    return () => {
      clearInterval(intervalId); 
    };
  }, []);

  const fetchChatHistory = () => {
    fetch(`http://192.168.1.7:5000/chat_history?username=${username}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const reversedChatHistory = data.reverse();
          setChatHistory(reversedChatHistory);
        } else {
          console.error('Unexpected response format:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching chat history:', error);
      });
  };

  return (
    <div>
      <h2>Chat History:</h2>
      <ul>
        {chatHistory.map((chat, index) => (
          <li key={index}>
            <strong>You: {chat.Prompt} <br />
            <br /> </strong> Bot: {chat.Response} 
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat_history;
