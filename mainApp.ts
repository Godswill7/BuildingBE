import cors from "cors";
import {
  Application,
  NextFunction,
  Request,
  Response,
  json,
} from "express";
import user from "./router/userRouter";
import agent from "./router/agentRouter";
import { HTTP } from "./Error/mainError";
import morgan from "morgan";
import helmet from "helmet";
import { errorHandler } from "./Error/errorHandler";
import {mainError} from "./Error/mainError"

export const mainApp = (app: Application) => {
  app.use(json());
  app.use(cors());
  app.use(morgan("dev"));
    app.use(helmet());
    
  app.use("/api", user);
  app.use("/api", agent);

  app.get("/",(req: Request, res: Response) => {
    try {
     return res.status(HTTP.OK).json({
        message: "Welcome to Wisdom Property API",
      });
    } catch (error:any) {
      return res.status(HTTP.BAD).json({
          message: "Root Error",
          data:error.message
      });
    }
  });
  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(
      new mainError({
        name: "Router Error",
        message: `Route Error: because the page, ${req.originalUrl} doesn't exit`,
        status: HTTP.BAD,
        success: false,
      })
    );
  });
  app.use(errorHandler);
};
