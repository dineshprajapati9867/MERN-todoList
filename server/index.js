const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

<<<<<<< HEAD
app.use(cors());
//app.use(cors({ origin: "https://mern-todo-list-nine.vercel.app" }));
=======
app.use(cors({ origin: "https://mern-todo-list-nine.vercel.app" }));

>>>>>>> c0d275dd21a48eb5562ecc7fd0af6e7723c1ca17
app.use(bodyParser.json());

connectDB();

app.use("/tasks", taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
