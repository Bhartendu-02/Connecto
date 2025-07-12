import express from "express";
import {createServer} from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToScoket } from "./controllers/socketmaganer.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";



const app = express();
const server= createServer(app);
const io = connectToScoket(server);

app.set("port",(process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

// app.get("/home", (req, res) => {
//     return res.json({"hello": "world"});
// });

const start = async () => {
    const connectionDb = await mongoose.connect("mongodb+srv://bhartendu0205:Bhartendu0205@cluster0.hzt86s2.mongodb.net/");
    console.log(`Mongo connected DBHOST: ${connectionDb.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log("listening on port 8000");
    });

}

start();