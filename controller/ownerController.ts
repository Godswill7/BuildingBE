import { compare, genSalt, hash } from "bcrypt";
import { randomBytes } from "crypto";
import ownerModel from "../model/ownerModel";
import { Role } from "../utils/role";
import { HTTP } from "../utils/interfaces";
import { Request, Response } from "express";

export const registerOwner = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userName, email, password } = req.body;

    const salt = await genSalt(10);
    const hashed = await hash(password, salt);

    const token = randomBytes(2).toString("hex");

      const user = await ownerModel.create({
          userName,
          email,
          password: hashed,
          token,
          image: email.charAt(0),
          role: Role.OWNER,
      });

    return res.status(HTTP.CREATE).json({
      message: "Owner registered Successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error registering Owner",
      data: error.message,
    });
  }
};

export const verifyOwner = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID, token } = req.params;

    const getOwner = await ownerModel.findById(userID);

    if (getOwner) {
      if (getOwner.token === token) {
        const owner = await ownerModel.findByIdAndUpdate(
          getOwner,
          {
            token: "",
            verified: true,
          },
          { new: true }
        );

        return res.status(HTTP.UPDATE).json({
          message: "verified Owner succesfull",
          data: owner,
        });
      } else {
        return res.status(HTTP.BAD).json({
          message: "Invalid Token",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "Owner not found",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error verifying Owner | user verification failed",
      data: error.message,
    });
  }
};

export const signInOwner = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const owner = await ownerModel.findOne({ email });

    if (owner) {
      const checkPassword = await compare(password, owner.password);
      if (checkPassword) {
        if (owner.verified && owner.token === "") {
          return res.status(HTTP.OK).json({
            message: "Welcome Back",
            data: owner,
          });
        } else {
          return res.status(HTTP.BAD).json({
            message: "Owner has not been verified",
          });
        }
      } else {
        return res.status(HTTP.BAD).json({
          message: "Password is incorrect",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "Owner is not found",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error signing in Owner",
      data: error.message,
    });
  }
};

export const deleteOwner = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { ownerID } = req.params;

    await ownerModel.findByIdAndDelete(ownerID);

    return res.status(HTTP.DELETE).json({
      message: "Owner Deleted",
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error deleting Owner",
      data: error.message,
    });
  }
};

export const viewAllUser = async (req: Request, res: Response) => {
  try {
    const owner = await ownerModel.find().populate({
      path: "owners",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(HTTP.OK).json({
      message: "viewing all Owners",
      data: owner,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error viewing all Owners",
      data: error.message,
    });
  }
};

export const viewOneOwner = async (req: Request, res: Response) => {
  try {
    const { ownerID } = req.params;

    const owner = await ownerModel.findById(ownerID);

    return res.status(HTTP.OK).json({
      message: "viewing one Owner",
      data: owner,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error viewing one Owner",
      data: error.message,
    });
  }
};
