import jwt from "jsonwebtoken";
import { APIError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import redisClient from "../utils/init_redis.js";

const authenticateToken = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];

    const decoedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decoedToken) {
      const redisUUID = await redisClient.get(decoedToken._id);
      if (decoedToken.uuid === redisUUID) {
        req.user = decoedToken;
        next();
      } else {
        throw new APIError(410);
      }
    }
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      throw new APIError(419, "token expired bhai", error);
    } else if (error.name == "JsonWebTokenError") {
      throw new APIError(400, "Required access token !", error);
    } else {
      if (error.statusCode == 410) {
        throw new APIError(410, "no longer have access to this resource");
      } else
        throw new APIError(
          400,
          "Error occured while verifying access token",
          error
        );
    }
  }
});

export { authenticateToken };
