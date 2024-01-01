import { Schema, model } from "mongoose";
import { iHouseData } from "../utils/interfaces";

const houseModel = new Schema<iHouseData>(
  {
    price: {
      type: Number,
      requred: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    ownerID: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default model<iHouseData>("houses", houseModel);
