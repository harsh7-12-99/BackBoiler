import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import newRoute from "./../src/routes/routes.js";
const app = express();

app.set("view engine", "ejs");

// middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
// middleware ends

// Routers imports
import userRouter from "./routes/user.routes.js";

// Routers declaration
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/word", newRoute);

app.use("/api/v1/users", userRouter);

//add user to the db

export { app };
