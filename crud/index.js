import express from "express";
import mongoose from "mongoose"  
import bodyParser  from "body-parser";   
import keyRoutes from "./routes/keyRoutes.js";

import dotenv from "dotenv";   
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use("/api/keys", keyRoutes);

const PORT = process.env.PORT || 5000;

const MONGOURL = process.env.MONGO_URL;

app.get("/", (req, res) => {
    res.send("Lecture Hall Key Request API is running");
});

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
