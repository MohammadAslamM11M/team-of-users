require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/users");
const teamRoutes = require("./routes/teams");

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.use("/api/users", userRoutes);
app.use("/api/team", teamRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
