import  jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { HTTP } from "../Error/mainError";
import agentModel from "../model/agentModel";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const registerAgent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const value = crypto.randomBytes(10).toString("hex");

    const agent = await agentModel.create({
      name,
      email,
      password: hashed,
      token: value,
      image: email.charAt[0],
    });

    return res.status(HTTP.CREATE).json({
      message: "Agent created successfully",
      data: agent,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error creating agent",
      data: error.message,
    });
  }
};

export const verifyAgent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { token } = req.params;

    const getAgentID: any = jwt.verify(
      token,
      "token",
      (err: any, payload: any) => {
        if (err) {
          return err;
        } else {
          return payload;
        }
      }
    );

    const user = await agentModel.findByIdAndUpdate(
      getAgentID.id,
      {
        token: "",
        verified: true,
      },
      { new: true }
    );

    return res.status(HTTP.OK).json({
      message: "verified agent",
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error verifying agent",
      data: error.message,
    });
  }
};

export const signInAgent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const agent = await agentModel.findOne({ email });

    if (agent) {
      const checkPassword = await bcrypt.compare(password, agent.password);
      if (checkPassword) {
        if (agent.verified && agent.token === "") {
          const token = jwt.sign(
            { id: agent?._id, email: agent?.email },
            "token"
          );
          return res.status(HTTP.OK).json({
            message: "Welcome Back",
            data: token,
          });
        } else {
          return res.status(HTTP.BAD).json({
            message: "agent haven't been verified",
          });
        }
      } else {
        return res.status(HTTP.BAD).json({
          message: "Password is incorrect",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "agent is not found",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error signing in agent",
      data: error.message,
    });
  }
};

export const deleteAgent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { agentID } = req.params;

    await agentModel.findByIdAndDelete(agentID);

    return res.status(HTTP.DELETE).json({
      message: "Agent Deleted",
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error deleting Agent",
      data: error.message,
    });
  }
};

export const viewAllAgent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const agent = await agentModel.find();

    return res.status(HTTP.OK).json({
      message: "viewing all agents",
      data: agent,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error viewing all Agents",
      data: error.message,
    });
  }
};

export const viewOneAgent = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { agentID } = req.params;

    const user = await agentModel.findById(agentID);

    return res.status(HTTP.OK).json({
      message: "viewing one agent",
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error viewing one agent",
      data: error.message,
    });
  }
};