import { Router } from "express";
import { Word } from "../models/wordModel.js";

const reviseWord = Router();

reviseWord.get("/", async (req, res) => {
  const randomSkip = Math.floor(Math.random() * 10);

  try {
    const newWord = await Word.aggregate([
      { $sort: { _id: -1 } },
      { $limit: 10 },
      { $skip: randomSkip },

      { $sample: { size: 1 } },
    ]);
    res.json(newWord);
  } catch (error) {
    console.error(error);
  }
});

export default reviseWord;
