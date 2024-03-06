import authModel from "../model/userModel";
import { compare, genSalt, hash } from "bcrypt";
import { Request, Response } from "express";
import jwt, { sign } from "jsonwebtoken";
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
    const { userName, email, password } = req.body;

    const salt = await genSalt(10);
    const hashed = await hash(password, salt);

    const token = randomBytes(2).toString("hex");

    
    const user = await authModel.create({
      userName,
      email,
      password: hashed,
      token,
      image: email.charAt(0),
      role: Role.USER,
    });

    sendFirstAccountMail(user).then(() => {
      console.log("Mail sent...!");
    });

    return res.status(HTTP.CREATE).json({
      message: "User registered Successfully",
      data: user,
      status: HTTP.CREATE,
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

    if (!getUser) {
      return res.status(HTTP.BAD).json({
        message: "User Not Found",
        status: HTTP.BAD,
      });
    }

    if (getUser.token !== token) {
      return res.status(HTTP.BAD).json({
        message: "Invalid Token",
        status: HTTP.BAD,
      });
    }

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
      status: HTTP.UPDATE,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error Verifying User | User Verification Failed",
      data: error.message,
      status: HTTP.BAD,
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: any = await authModel.findOne({ email });
    const checkPassword = await compare(password, user.password);

    if (!user) {
      return res.status(HTTP.BAD).json({
        message: "User Is Not Found",
        status: HTTP.BAD,
      });
    }

    if (!checkPassword) {
      return res.status(HTTP.BAD).json({
        message: "Password is Incorrect",
        status: HTTP.BAD,
      });
    }

    if (!user.verified && user.token !== "") {
      return res.status(HTTP.BAD).json({
        message: "User Has Not Been verified",
      });
    }

    return res.status(HTTP.OK).json({
      message: "Welcome Back",
      data: user,
    });
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
      status: HTTP.DELETE,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error Deleting User",
      data: error.message,
      status: HTTP.BAD,
    });
  }
};

export const viewAllUser = async (req: Request, res: Response) => {
  try {
    const user = await authModel.find();

    return res.status(HTTP.OK).json({
      message: "Viewing All User",
      data: user,
      status: HTTP.OK,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error Viewing All Users",
      data: error.message,
      status: HTTP.BAD,
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
      status:HTTP.OK,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error Viewing One User",
      data: error.message,
      status:HTTP.BAD,
    });
  }
};
