import cors from "cors";
import express, { Application, Request, Response } from "express";
import user from "./router/amidatRouter";
import { HTTP } from "./Error/mainError";
import morgan from "morgan";
import helmet from "helmet";

export const mainApp = (app: Application) => {
  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));
    app.use(helmet());
    
  app.use("/api", user);

  app.get("/",(req: Request, res: Response) => {
    try {
     return res.status(HTTP.OK).json({
        message: "Welcome Home",
      });
    } catch (error:any) {
      return res.status(HTTP.BAD).json({
          message: "Root Error",
          data:error.message
      });
    }
  });
};
