import { Schema, Types, model } from "mongoose";
import { iAgentData } from "../utils/interfaces";


const agentModel = new Schema<iAgentData>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    token: {
      type: String,
    },
    role: {
      type: String,
    },
    rating: {
      type: Number,
    },
    ratings: {
      type: [Number],
    },
    history: [
      {
        type: Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<iAgentData>("agents", agentModel);
