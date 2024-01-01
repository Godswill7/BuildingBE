import {  Schema, Types, model } from "mongoose";
import { iUserData } from "../utils/interfaces";


const userModel = new Schema<iUserData>(
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
      default: false,
    },
    token: {
      type: String,
    },
    role: {
      type: String,
    },
    premium: {
      type: Boolean,
      default: false,
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

export default model<iUserData>("users",userModel)
