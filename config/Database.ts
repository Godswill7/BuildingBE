import { connect } from "mongoose";
import dotenv from "dotenv";
import envElements from "./envElements";
dotenv.config();

const dbString = envElements.databaseString;

export const dbConnect = () => {
  try {
    connect(dbString).then(() => {
      console.log("Database Active 😎😋😊");
    });
  } catch (error: any) {
    console.log(`Error conecting db: ${error.message}`);
  }
};
