import { Document } from "mongoose";

interface iUser {
  name: string;
  email: string;
  password: string;
  image: string;
  imageID: string;
  verified: boolean;
  token: string;
}

interface iAgent {
  name: string;
  email: string;
  password: string;
  image: string;
  imageID: string;
  verified: boolean;
  token: string;
}

interface iOwner {
  name: string;
  email: string;
  password: string;
  image: string;
  imageID: string;
    verified: boolean;
    houses:{}[]
}

export interface iUserData extends iUser, Document {}
export interface iAgentData extends iAgent, Document {}
export interface iOwnerData extends iOwner, Document {}
