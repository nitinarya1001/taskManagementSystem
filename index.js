import app from "./app.js";
import connectDB from "./src/db/db.js";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("app couldn't launch: ", err);
      throw err;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB Connection failed in Index.js: ", err);
  });
