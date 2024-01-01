import { Document } from "mongoose";

interface iUser {
  userName: string;
  email: string;
  password: string;
  image: string;
  imageID: string;
  verified: boolean;
  token: string;
  premium: boolean;
  role: string;
  history: {}[];
}

interface iAgent {
  userName: string;
  email: string;
  password: string;
  image: string;
  imageID: string;
  verified: boolean;
  token: string;
  rating: number;
  ratings: number[];
  role: string;
  history: {}[];
}

interface iOwner {
  userName: string;
  email: string;
  password: string;
  image: string;
  imageID: string;
  verified: boolean;
  role: string;
  houses: {}[];
  history: {}[];
}

interface iHouse {
  price: number;
  location: string;
  image: string;
  imageID: string;
  ownerID: string;
  agentID: string;
}

export interface iHouseData extends iHouse, Document {}
export interface iUserData extends iUser, Document {}
export interface iAgentData extends iAgent, Document {}
export interface iOwnerData extends iOwner, Document {}
