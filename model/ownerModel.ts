import { Schema, Types, model } from "mongoose";
import { iOwnerData } from "../config/interfaces";

const ownerSchema = new Schema<iOwnerData>(
  {
    name: {
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
    houses: [
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
