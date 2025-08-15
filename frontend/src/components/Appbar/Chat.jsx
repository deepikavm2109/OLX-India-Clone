// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Chat = ({ buyerId, sellerId }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     axios.get('/olxapi/messages/')
//       .then(res => setMessages(res.data));
//   }, []);

//   const handleSend = () => {
//     axios.post('/olxapi/messages/', {
//       chat_room: 1,  // Replace with dynamic chat room ID
//       sender: buyerId,  // or sellerId depending on the sender
//       content: newMessage
//     }).then(res => {
//       setMessages([...messages, res.data]);
//       setNewMessage("");
//     });
//   };

//   return (
//     <div>
//       <h3>Chat</h3>
//       <div>
//         {messages.map(msg => (
//           <p key={msg.id}><strong>{msg.sender}</strong>: {msg.content}</p>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//       />
//       <button onClick={handleSend}>Send</button>
//     </div>
//   );
// };

// export default Chat;


import { useState, useEffect } from 'react';
import axios from 'axios';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   axios.get('/olxapi/profile/', {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('access')}`,
  //     }
  //   })
  //   .then(response => setUser(response.data))
  //   .catch(error => console.error(error));
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem('access');
  
      if (!accessToken) {
        console.error("No access token found.");
        return;
      }
  
      try {
        const response = await axios.get('/olxapi/profile/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Try refreshing the token
          const refreshToken = localStorage.getItem('refresh');
          if (refreshToken) {
            try {
              const tokenResponse = await axios.post('/olxapi/token/refresh/', {
                refresh: refreshToken,
              });
              localStorage.setItem('access', tokenResponse.data.access);
  
              // Retry fetching the profile
              const retryResponse = await axios.get('/olxapi/profile/', {
                headers: {
                  Authorization: `Bearer ${tokenResponse.data.access}`,
                }
              });
              setUser(retryResponse.data);
            } catch (refreshError) {
              console.error("Token refresh failed.", refreshError);
            }
          } else {
            console.error("No refresh token found.");
          }
        } else {
          console.error(error);
        }
      }
    };
  
    fetchUser();
  }, []);

  const sendMessage = () => {
    if (user) {
      axios.post('/olxapi/messages/', {
        chat_room: 1,  // Example chat room ID
        sender: user.id,  // User from the API response
        text: newMessage,
      })
      .then(response => {
        setMessages([...messages, response.data]);
        setNewMessage('');
      })
      .catch(error => console.error(error));
    } else {
      console.error("User not authenticated.");
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}><b>{msg.sender}</b>: {msg.text}</p>
        ))}
      </div>
      <input 
        type="text" 
        value={newMessage} 
        onChange={(e) => setNewMessage(e.target.value)} 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
