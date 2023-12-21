import { asycHander } from "../utils/asycHandler.js";
import { User } from "../models/user.mode.js";
import jwt from "jsonwebtoken";

const registerUser = asycHander(async (req, res) => {
  const { username, email, password } = req.body;
  // look for the same email in the db
  const userExisted = await User.findOne({ $or: [{ email }] });

  if (userExisted) {
    res.status(409).json(userExisted);
  } else {
    const newUser = await User.create(req.body);
    const accesstoken = await newUser.generateAccessToken();
    const refreshToken = await newUser.generateRefreshToken();
    console.log(accesstoken);
    console.log(refreshToken);
    res.status(200).json(newUser);
  }
});

const refreshToken = asycHander(async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.setStatus(401);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, usr) => {
    if (err) return res.status(403).json("invalid request");
    else {
      const email = req.body.email;
      const newUser = await User.findOne({ $or: [{ email }] });
      const newAccess = newUser.generateAccessToken();
      console.log(newAccess);
    }
  });
});

export { registerUser, refreshToken };
