// src/pages/index.js
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const router = useRouter();

  const createChat = () => {
    const chatId = uuidv4();
    router.push(`/chat/${chatId}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white font-sans">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 font-poppins">YouAndMe</h1>

        {/* CHANGED: New sarcastic subtitle */}
        <p className="text-lg text-slate-400 mb-12">
          Chalo, panchayat shuru karein.
        </p>
        
        <button
          onClick={createChat}
          className="group relative inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur-xl"></span>
          {/* CHANGED: New button text */}
          <span className="relative">Shuru Ho Jao</span>
        </button>
      </div>
    </div>
  );
}