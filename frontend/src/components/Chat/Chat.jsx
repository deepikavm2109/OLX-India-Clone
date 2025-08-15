import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = ({ buyerId, sellerId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    axios
      .get(`/olxapi/messages/?buyer=${buyerId}&seller=${sellerId}`)
      .then((res) => setMessages(res.data));
  }, [buyerId, sellerId]);

  const handleSend = () => {
    axios
      .post('/olxapi/messages/', {
        sender: buyerId,  // Replace with sellerId if needed
        receiver: sellerId,
        content: newMessage,
      })
      .then((res) => {
        setMessages([...messages, res.data]);
        setNewMessage('');
      });
  };

  return (
    <div className="chat-window">
      <h3>Chat with Seller</h3>
      <div className="messages">
        {messages.map((msg) => (
          <p key={msg.id}>
            <strong>{msg.sender === buyerId ? 'You' : 'Seller'}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
