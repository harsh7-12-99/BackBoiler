import { Router } from "express";
import { Word } from "../models/wordModel.js";

const wordRoute = Router();

wordRoute.get("/", async (req, res) => {
  try {
    const newWord = await Word.findOne({}).sort({ _id: -1 });

    const d = new Date(newWord.createdAt);
    const currentDate = new Date();

    if (
      d.getDate() == currentDate.getDate() &&
      d.getMonth() == currentDate.getMonth()
    );
    {
      console.log("word cannot be added");
    }
    res.json(newWord);
  } catch (error) {
    console.error(error);
  }
});

export default wordRoute;
