require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use("/admin", require("./routes/adminRoutes"));
app.use("/blog", require("./routes/blogRoutes"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
