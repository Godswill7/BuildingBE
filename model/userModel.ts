import { Document, Schema, model } from "mongoose";

interface iUser {
  name: string;
  email: string;
  password: string;
  image: string;
  imageID: string;
  verified: boolean,
  token: string,
}

interface iUserData extends iUser, Document {}

const userModel = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

export default model<iUserData>("users",userModel)
