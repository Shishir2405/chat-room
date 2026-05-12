const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", messageRoutes);

module.exports = app;
