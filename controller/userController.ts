import authModel from "../model/userModel";
import { compare, genSalt, hash } from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { sendAccountMail, sendFirstAccountMail } from "../utils/email";
import { HTTP } from "../utils/interfaces";
import userModel from "../model/userModel";
import { Role } from "../utils/role";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userName, email,password } = req.body;

    const salt = await genSalt(10);
    const hashed = await hash(password, salt);

    const token = randomBytes(2).toString("hex");

    const user = await authModel.create({
      userName,
      email,
      password:hashed,
      token,
      image: email.charAt(0),
      role:Role.USER
    });

    sendFirstAccountMail(user).then(() => {
      console.log("Mail sent...!");
    });

    return res.status(HTTP.CREATE).json({
      message: "User registered Successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error registering user",
      data: error.message,
    });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID, token } = req.params;

    const getUser = await userModel.findById(userID);

    if (getUser) {
     if (getUser.token === token) {
       const user = await authModel.findByIdAndUpdate(
         getUser,
         {
           token: "",
           verified: true,
         },
         { new: true }
       );

       return res.status(HTTP.UPDATE).json({
         message: "Verified User Succesfull",
         data: user,
       });
     } else {
       return res.status(HTTP.BAD).json({
         message: "Invalid Token",
       });
     }
    } else {
      return res.status(HTTP.BAD).json({
        message: "User Not Found",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error Verifying User | User Verification Failed",
      data: error.message,
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authModel.findOne({ email });

    if (user) {
      const checkPassword = await compare(password, user.password);
      if (checkPassword) {
        if (user.verified && user.token === "") {
          return res.status(HTTP.OK).json({
            message: "Welcome Back",
            data: user,
          });
        } else {
          return res.status(HTTP.BAD).json({
            message: "User Has Not Been verified",
          });
        }
      } else {
        return res.status(HTTP.BAD).json({
          message: "Password is Incorrect",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "User Is Not Found",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error Signing In User",
      data: error.message,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;

    await authModel.findByIdAndDelete(userID);

    return res.status(HTTP.DELETE).json({
      message: "User Deleted",
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error Deleting User",
      data: error.message,
    });
  }
};

export const viewAllUser = async (req: Request, res: Response) => {
  try {
    const user = await authModel.find().populate({
      path: "users",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });;

    return res.status(HTTP.OK).json({
      message: "Viewing All User",
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error Viewing All Users",
      data: error.message,
    });
  }
};

export const viewOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await authModel.findById(userID);

    return res.status(HTTP.OK).json({
      message: "Viewing One User",
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error Viewing One User",
      data: error.message,
    });
  }
};
