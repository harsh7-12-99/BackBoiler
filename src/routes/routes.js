import { Router } from "express";
const router = Router();
import getWord from "./getWordRoutes.js";
import addWord from "./addWordRoutes.js";
import reviseWord from "./reviseWord.js";
import { refreshToken } from "../controllers/user.controller.js";

router.route("/").get((req, res) => {
  res.status(404).json({ message: "not found" });
});
router.use("/get", getWord);
router.use("/add", addWord);
router.use("/revise", reviseWord);
router.route("/refresh").post(refreshToken);

export default router;
