const dotenv = require("dotenv");

dotenv.config();

const express = require("express");

const { Server } = require("socket.io");

const http = require("http");

const cookiesPurser = require("cookie-parser");

const connectDB = require("./config/db");

const app = express();

const cors = require("cors");

const server = http.createServer(app);

const Homework = require("./models/homework.model");

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

global.io = io;
// =======================Route Require======================
const userRouter = require("./router/user.route");
const studentRouter = require("./router/student.route");
const classRouter = require("./router/class.route");
const homeworkRouter = require("./router/homework.route");
const announcemantRoute = require("./router/anouncement.route");
const attendanceRoute = require("./router/attendance.route");
const notificationRoute = require("./router/nottification.route");
const notificationReadRoute = require("./router/notificationread.route");
const schoolRoute = require("./router/school.router");
const newsRoute = require("./router/news.route");
// ===================MiddleWere=====================
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(cookiesPurser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// =============DB Connection================
connectDB();

io.on("connection", (socket) => {
  socket.on("join-school", ({ school }) => {
    socket.join(school);
    console.log(`Socket ${socket.id} joined school: ${school}`);
  });

  socket.on("disconnect", () => {});
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/user", userRouter);
app.use("/api/student", studentRouter);
app.use("/api/classes", classRouter);
app.use("/api/homework", homeworkRouter);
app.use("/api/announcemant", announcemantRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/notification", notificationRoute);
app.use("/api/notifyread", notificationReadRoute);
app.use("/api/schools", schoolRoute);
app.use("/api/news", newsRoute);

module.exports = server;
