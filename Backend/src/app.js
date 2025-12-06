import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    await mongoose.connect("mongodb+srv://wankhedeankita899_db_user:Ankita%40123@cluster0.nbhbodk.mongodb.net/");
    console.log("MONGO Connected!");

    server.listen(app.get("port"), () => {
        console.log("LISTENING ON PORT 8000");
    });
};

start();
