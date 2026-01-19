import express from "express";

const homePage = express.Router();

homePage.get("/", (req, res) => {
  res.render("/index.html");
});

export { homePage };
