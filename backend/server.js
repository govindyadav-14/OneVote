const express = require('express');
const app = express();
const cors = require('cors'); 
require('dotenv').config();
const db = require('./db');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');

// 1. CONFIGURE EXPRESS CORS (For Login/Signup/API)
app.use(cors({
    origin: true, // Automatically reflect requesting origin
    credentials: true
}));

const server = http.createServer(app);

// 2. CONFIGURE SOCKET.IO CORS (For Live Results)
const io = new Server(server, {
  cors: {
    origin: true, // Automatically reflect requesting origin
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.set('io', io);

// Handle WebSocket Connections
io.on('connection', (socket) => {
    console.log(`New Client Connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log('Client Disconnected');
    });
});

app.use(bodyParser.json());

const PORT = process.env.PORT || 5001;

// Routes
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});