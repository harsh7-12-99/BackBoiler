import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.mode.js";
import jwt from "jsonwebtoken";
import { APIError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
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

const refreshToken = asyncHandler(async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const decoedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    if (decoedToken) {
      const email = req.body.email;
      const newUser = await User.findOne({ $or: [{ email }] });
      const newAccess = newUser.generateAccessToken();
      console.log(newAccess);
    }
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      throw new APIError(419, "token expired bhai", error);
    } else if (error.name == "JsonWebTokenError") {
      throw new APIError(400, "Required access token !", error);
    } else {
      throw new APIError(
        400,
        "Error occured while verifying refresh token",
        error
      );
    }
  }
});

const login = asyncHandler(async (req, res) => {
  // 1. get the username and pass
  // 2. find the user from db using username
  // 3. verify password is correct or not
  // 4. if correct generate access and refresh token and store refresh in db
  // 5. if incorrect response handle it

  // get the data
  const { username, email, password } = req.body;

  // verify the data arived
  if (!username && !email) {
    throw new APIError(400, "Username or password is required");
  }

  // find the user from db from the retrived data
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    throw new APIError(404, "User does not Exist");
  }
  //verfiy the passowrd entered by user
  const isPassValid = await user.isPasswordCorrect(password);
  if (!isPassValid) {
    throw new APIError(401, "Invalid Password");
  }

  // generate refresh and access token
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: user, accessToken, refreshToken },
        "User logged In Successfully"
      )
    );
});

export { registerUser, refreshToken, login };
