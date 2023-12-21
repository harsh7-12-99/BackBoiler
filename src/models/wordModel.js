import mongoose from "mongoose";

const wordSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: [true, "word must required"],
      unique: [true, "word must unique"],
    },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const Word = mongoose.model("Word", wordSchema);
