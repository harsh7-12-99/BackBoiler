import dotenv from "dotenv";
import connectDB from "./db/dbConnection.js";
import { app } from "./app.js";

dotenv.config({ path: "./env" });

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running at port 3000");
    });
  })
  .catch((err) => {
    console.error("mongo db connection faile");
  });
