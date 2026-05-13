import mongoose from "mongoose";

const keySchema = new mongoose.Schema(
  {
    lectureHall: {
      type: String,
      required: true,
      trim: true,     // trim: remove extra spaces from the beginning and end of a string.
    },

    keyNumber: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["available", "borrowed"],
      default: "available",
    },

    borrowedBy: {
      type: String,
      default: null,
    },

    borrowedDate: {
      type: Date,
      default: null,
    },

    returnDate: {
      type: Date,
      default: null,
    },
  }
);

export default mongoose.model("Key", keySchema);
