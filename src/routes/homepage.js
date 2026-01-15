import express from "express";

const homePage = express.Router();

homePage.get("/", (req, res) => {
  res.send("Hello! This is Homepage");
});

export { homePage };
