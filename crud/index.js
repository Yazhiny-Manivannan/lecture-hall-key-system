import express from "express";
import mongoose from "mongoose"  
import dotenv from "dotenv";   
import bodyParser  from "body-parser";  

import authRoutes from "./routes/authRoutes.js";
import keyRoutes from "./routes/keyRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/keys", keyRoutes);

// Home page
app.get("/", (req, res) => {
    res.send("Lecture Hall Key Request API is running");
});

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose
.connect(MONGOURL)
.then(() => {
    console.log("Database connected successfully.");   

    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);   
    });
})

  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
