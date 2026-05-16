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

    building: {
      type: String,
      default: "Main Campus",
    },
  
    status: {
      type: String,
      enum: ["available", "in_use", "lost"],
      default: "available",
    },

    openedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    openedTime: {
      type: Date,
      default: null,
    },

    returnedTime: {
      type: Date,
      default: null,
    },

    history: [
      {
        action: {
          type: String,
          enum: ["opened", "closed"],
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],

  }
);

export default mongoose.model("Key", keySchema);
