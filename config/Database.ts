import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbString: string = process.env.DB_STRING!;

export const dbConnect = () => {
  try {
    mongoose.connect(dbString).then(() => {
      console.log("Database Active !!!");
    });
  } catch (error: any) {
    console.log("Error conecting db: ", error.message);
  }
};
