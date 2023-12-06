import {  Schema, model } from "mongoose";
import { iUserData } from "../config/interfaces";


const userModel = new Schema<iUserData>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required:true,
    },
    password: {
      type: String,
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
    premium: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<iUserData>("users",userModel)
