import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAccessToken = function () {
  const payload = { _id: this._id, email: this.email, username: this.username };
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const expiry = process.env.ACCESS_TOKEN_EXPIRY;
  return jwt.sign(payload, secret, {
    expiresIn: expiry,
  });
};

userSchema.methods.generateRefreshToken = function () {
  const payload = { _id: this._id };
  const secret = process.env.REFRESH_TOKEN_SECRET;
  const expiry = process.env.REFRESH_TOKEN_EXPIRY;
  return jwt.sign(payload, secret, {
    expiresIn: expiry,
  });
};

export const User = mongoose.model("User", userSchema);
