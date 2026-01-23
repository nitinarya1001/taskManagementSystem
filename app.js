import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

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

// setting ejs views
app.set("views", "./public/views");
app.set("view engine", "ejs");

//routes Import
import userRoutes from "./src/routes/user.routes.js";
import taskRoutes from "./src/routes/task.routes.js";

import { homePage } from "./src/routes/homepage.js";

// routes declaration
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/", homePage);

export default app;
