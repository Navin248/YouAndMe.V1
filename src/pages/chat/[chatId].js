// src/pages/chat/[chatId].js
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';

const CHAT_SERVER_URL = process.env.NEXT_PUBLIC_CHAT_SERVER_URL || 'http://localhost:3001';

export default function ChatRoom() {
  const router = useRouter();
  const { chatId } = router.query;

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!chatId) return;
    const newSocket = io(CHAT_SERVER_URL);
    setSocket(newSocket);
    newSocket.emit('join_room', chatId);

    newSocket.on('connect', () => console.log('Connected to chat server with ID:', newSocket.id));
    newSocket.on('load_messages', (messages) => setChatHistory(messages));
    newSocket.on('receive_message', (message) => setChatHistory((prev) => [...prev, message]));

    return () => newSocket.disconnect();
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      const messageData = { chatId, text: message, sender: socket.id };
      socket.emit('send_message', messageData);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-slate-300 font-sans">
      
      <header className="bg-black/20 p-4 shadow-lg">
        <h1 className="text-xl font-semibold text-center text-slate-100 font-poppins">
          YouAndMe
        </h1>
        <p className="text-center text-sm text-white mt-2">
          A private space, just for us.
        </p>
      </header>

      <main className="flex-1 overflow-y-auto p-2 sm:p-4">
        <div className="space-y-2">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === socket?.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-xl shadow-md ${msg.sender === socket?.id ? 'bg-[#005c4b] text-white rounded-br-none' : 'bg-[#202c33] text-slate-200 rounded-bl-none'}`}>
                <p className="break-words">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>
      
      <footer className="p-2 sm:p-4">
        <form onSubmit={sendMessage} className="flex items-center space-x-2 sm:space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 bg-[#202c33] border border-transparent rounded-full py-3 px-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005c4b] transition-all duration-300"
          />
          {/* CHANGED: Added disabled state and styling */}
          <button
            type="submit"
            className="bg-[#005c4b] hover:bg-[#00705a] text-white font-bold p-3 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 focus:outline-none disabled:bg-slate-700 disabled:scale-100 disabled:cursor-not-allowed"
            aria-label="Send message"
            disabled={!message.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
              <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.534h6.105a.75.75 0 000-1.5H4.994L3.622 3.05a.75.75 0 00-.517-.76zM14.994 12.006a.75.75 0 00-.517.76l1.373 4.293a.75.75 0 00.95.534l4.949-1.414a.75.75 0 00.534-.95l-4.293-1.373a.75.75 0 00-.76-.517h-1.5z" />
              <path d="M12.232 4.232a.75.75 0 001.06 1.06l5.25-5.25a.75.75 0 00-1.06-1.06l-5.25 5.25zM3.75 8.25a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5zM4.5 12a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM8.25 15.75a.75.75 0 001.5 0v-1.5a.75.75 0 00-1.5 0v1.5zM12 15a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5z" />
            </svg>
          </button>
        </form>
      </footer>
    </div>
  );
}