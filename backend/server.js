const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoute.js");
const chatRoutes = require("./routes/chatRoutes.js");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
connectDB();

app.use(bodyparser.json({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
