import { Request, Response } from "express";
import agentModel from "../model/agentModel";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { HTTP } from "../utils/interfaces";
import { Role } from "../utils/role";

export const registerAgent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const value = crypto.randomBytes(10).toString("hex");

    const agent = await agentModel.create({
      userName,
      email,
      password: hashed,
      token: value,
      image: email.charAt(0),
      role: Role.AGENT,
    });

    return res.status(HTTP.CREATE).json({
      message: "Agent created successfully",
      data: agent,
      status:HTTP.CREATE,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error creating agent",
      data: error.message,
      status:HTTP.BAD,
    });
  }
};

export const verifyAgent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { agentID, token } = req.params;

    const getAgent = await agentModel.findById(agentID);

    if (!getAgent) {
      return res.status(HTTP.BAD).json({
        message: "Agent does not exist",
      });
    }

    if (getAgent.token === token) {
      return res.status(HTTP.BAD).json({
        message: "Incorrect Token / Invalid Token",
        data: getAgent,
      });
    }

    await agentModel.findByIdAndUpdate(
      getAgent,
      {
        token: "",
        verified: true,
      },
      { new: true }
    );
    return res.status(HTTP.OK).json({
      message: "Agent verification successfull",
      data: getAgent,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error verifying agent",
      data: error.message,
    });
  }
};

export const signInAgent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const agent = await agentModel.findOne({ email });

    if (!agent) {
      return res.status(HTTP.BAD).json({
        message: "agent is not found",
        status: HTTP.BAD,
      });
    }
    const checkPassword = await bcrypt.compare(password, agent.password);

    if (!checkPassword) {
      return res.status(HTTP.BAD).json({
        message: "Password is incorrect",
        status: HTTP.BAD,
      });
    }

    if (agent.verified && agent.token === "") {
      return res.status(HTTP.OK).json({
        message: `Welcome Back Agent ${agent.userName}`,
      });
    } else {
      return res.status(HTTP.BAD).json({
        message: "agent haven't been verified",
        status: HTTP.BAD,
      });
    };

  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error signing in agent",
      data: error.message,
      status: HTTP.BAD,
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
      status:HTTP.DELETE
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error deleting Agent",
      data: error.message,
      status:HTTP.BAD,
    });
  }
};

export const viewAllAgent = async (
  req: Request,
  res: Response
): Promise<Response> => {
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

export const viewOneAgent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { agentID } = req.params;

    const findOneAgent = await agentModel.findById(agentID);

    return res.status(HTTP.OK).json({
      message: "viewing one agent",
      data: findOneAgent,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error viewing one agent",
      data: error.message,
    });
  }
};
