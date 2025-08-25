const express = require("express");
const path = require("path");
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;

const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "public")));


const io = new Server(server, {
  cors: {
    origin: "*",   
  }
});

io.on('connection', (socket) => {
  console.log('ผู้ใช้เชื่อมต่อ:', socket.id);

  socket.on('chat message', (msg) => {
    console.log('ข้อความจาก client:', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('ผู้ใช้ตัดการเชื่อมต่อ:', socket.id);
  });
});




app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
  console.log("แสดงหน้าแรก");
});


app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/profile.html"));
});

app.get("/about", (req, res) => {
   res.sendFile(path.join(__dirname, "templates/about.html"));
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});