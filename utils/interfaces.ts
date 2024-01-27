import { Document } from "mongoose";

export enum HTTP {
  CREATE = 201,
  BAD = 404,
  UPDATE = 202,
  DELETE = 204,
  OK = 200,
}

export interface iError {
  name: string;
  message: string;
  success: boolean;
  status: HTTP;
}
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
  token: string;
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

interface iPayment {
  amount: string;
  date: string;
  buyerID: string;
  sellerID: string;
  transactionID: string;
}

export interface iHouseData extends iHouse, Document {}
export interface iUserData extends iUser, Document {}
export interface iAgentData extends iAgent, Document {}
export interface iOwnerData extends iOwner, Document {}
export interface iPaymentData extends iPayment, Document {}
