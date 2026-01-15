import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { register, login } from "./src/routes/auth.js";
import { homePage } from "./src/routes/homepage.js";

const app = express();

//middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes
app.use("/api/auth", register);
app.use("/api/auth", login);
app.use("/", homePage);

export default app;
