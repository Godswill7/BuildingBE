import { Schema, Types, model } from "mongoose";
import { iOwnerData } from "../utils/interfaces";

const ownerSchema = new Schema<iOwnerData>(
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
    token: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
    },
    houses: [
      {
        type: Types.ObjectId,
        ref: "houses",
      },
    ],
    history: [
      {
        type: Types.ObjectId,
        ref: "houses",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<iOwnerData>("owners", ownerSchema);
