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

//routes Import
import router from "./src/routes/user.routes.js";
import { homePage } from "./src/routes/homepage.js";

// routes declaration
app.use("/api/v1/users", router);
app.use("/", homePage);

export default app;
