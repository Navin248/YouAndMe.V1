// server/server.js

const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // To use environment variables from .env file

const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing

const server = http.createServer(app);

// Initialize Socket.IO and allow connections from our Vercel frontend
const io = new Server(server, {
    cors: {
        origin: "*", // In production, you should lock this to your Vercel URL
        methods: ["GET", "POST"]
    }
});

// --- MONGODB and DATABASE SETUP ---

// 1. Connect to MongoDB using the URI from our .env file
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Successfully connected to MongoDB."))
    .catch((err) => console.error("MongoDB connection error:", err));

// 2. Define the schema for a message
const messageSchema = new mongoose.Schema({
    chatId: { type: String, required: true },
    sender: { type: String, required: true }, // 'user' or 'other'
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// 3. ✨ THE MAGIC! This TTL index automatically deletes documents 7 days after creation.
messageSchema.index({ "createdAt": 1 }, { expireAfterSeconds: 604800 }); // 604800 seconds = 7 days

// 4. Create the Message model from the schema
const Message = mongoose.model('Message', messageSchema);


// --- REAL-TIME CHAT LOGIC ---

io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // When a user joins a specific chat room
    socket.on('join_room', async (chatId) => {
        socket.join(chatId);
        console.log(`User ${socket.id} joined room ${chatId}`);

        // Load past messages from the database for that room
        try {
            const messages = await Message.find({ chatId }).sort({ createdAt: 'asc' });
            // Emit only to the user who just joined
            socket.emit('load_messages', messages);
        } catch (error) {
            console.error("Error loading messages:", error);
        }
    });

    // When a user sends a message
    socket.on('send_message', async (data) => {
        console.log("Received message on backend:", data); 
        const { chatId, sender, text } = data;

        // Create a new message document
        const newMessage = new Message({
            chatId,
            sender,
            text
        });

        try {
            // Save the message to the database
            const savedMessage = await newMessage.save();
            // Broadcast the saved message to everyone in the chat room
            io.to(chatId).emit('receive_message', savedMessage);
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// A simple test route to make sure our server is running
app.get('/', (req, res) => {
    res.send('YouAndMe Chat Server is running!');
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});