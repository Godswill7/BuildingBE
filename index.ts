import { dbConnect } from "./config/Database";
import express, { Application } from "express";
import env from "dotenv";
import { mainApp } from "./mainApp";
env.config();

// const port = parseInt(process.env.PORT!);
const port = 1234;
const app: Application = express();

mainApp(app);

const server = app.listen(port, () => {
  console.log();
  dbConnect();
  console.log(port)
}); 
process.on("uncaughtException", (error: Error) => {
  console.log("Error due to uncaughtException", error.message);
});

process.on("unhandledRejection", (reason: any) => {
  server.close(() => {
    console.log("Error due to unhandledRejection", reason.message);
  });
});
