import jwt from "jsonwebtoken";
import { APIError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const authenticateToken = asyncHandler((req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];

    const decoedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decoedToken) {
      req.user = decoedToken;
      next();
    }
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      throw new APIError(419, "token expired bhai", error);
    } else if (error.name == "JsonWebTokenError") {
      throw new APIError(400, "Required access token !", error);
    } else {
      throw new APIError(
        400,
        "Error occured while verifying access token",
        error
      );
    }
  }
});

export { authenticateToken };
