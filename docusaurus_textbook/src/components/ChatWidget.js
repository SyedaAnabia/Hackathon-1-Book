
import { useState } from 'react';
import axios from 'axios';
import './chat.css';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const res = await axios.post("https://backend-deploy-yt.onrender.com/chat", {
        message: input
      });

      const botMessage = { sender: "bot", text: res.data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: "bot", text: "Error: Unable to reach server" }]);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <button className="chat-button" onClick={() => setOpen(!open)}>
        💬 Chat
      </button>

      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <strong>AI Assistant</strong>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.sender}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
