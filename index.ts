import { dbConnect } from "./config/Database";
import express, { Application, request, response } from "express";
import env from "dotenv";
import { mainApp } from "./mainApp";
import envElements from "./config/envElements";
env.config();

const port = envElements.port!;
const app: Application = express();

mainApp(app);


const server = app.listen(process.env.PORT! || port, () => {
  console.log()
  dbConnect();
}); 
process.on("uncaughtException", (error: Error) => {
  console.log("Error due to uncaughtException", error.message);
});

process.on("unhandledRejection", (reason: any) => {
  server.close(() => {
    console.log("Error due to unhandledRejection", reason.message);
  });
});
