import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import router from "./Router/routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo"

dotenv.config();
const app = express();

const url = process.env.MONGO_URL;

//session config

app.use(session({
    name: "rideconnect.sid",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collectionName: "session"
    }),
    cookie: {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24
    }
}))

//middlewares

app.use(express.json());

//routing api

app.use("/api/", router)

app.listen(8080, () => {
    mongoose.connect(url)
        .then(() => { console.log("DB connected") })
    console.log("Server is running on port 8080");
})