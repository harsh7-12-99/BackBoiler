import { Router } from "express";
import { Word } from "../models/wordModel.js";
const addWord = Router();

addWord.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newWord = await Word.create(req.body);
    res.json(newWord);
  } catch (error) {
    console.error(error);
  }
});

export default addWord;
