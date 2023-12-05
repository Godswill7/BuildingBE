import { Schema, model } from "mongoose";
import { iAgentData } from "../config/interfaces";


const agentModel = new Schema<iAgentData>(
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

export default model<iAgentData>("agents", agentModel);
