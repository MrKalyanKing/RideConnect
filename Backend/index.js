import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import router from "./Router/routes.js";
dotenv.config();
const app = express();

const url = process.env.MONGO_URL;

//middlewares

app.use(express.json());

//routing api

app.use("/api/", router)

app.listen(8080, () => {
    mongoose.connect(url)
        .then(() => { console.log("DB connected") })
    console.log("Server is running on port 8080");
})