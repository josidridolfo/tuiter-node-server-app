import express from 'express';
import cors from 'cors';
import HelloController from "./controllers/hello-controller.js";
import UserController from "./controllers/users-controller.js";
import TuitsController from "./controllers/tuitsController.js";
import mongoose from "mongoose";
const app = express();
app.use(cors());
app.use(express.json());
HelloController(app);
UserController(app);
TuitsController(app);
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter'
mongoose.connect(CONNECTION_STRING);
app.listen(process.env.PORT || 4000);