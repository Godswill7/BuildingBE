import { Schema, model } from "mongoose";
import { iPaymentData } from "../utils/interfaces";


const paymentModel = new Schema<iPaymentData>({
  amount: {
    type: String,
  },
  date: {
    type: String,
  },
  buyerID: {
    type: String,
  },
  sellerID: {
    type: String,
  },
  transactionID: {
    type: String,
  },
}, {
    timestamps:true
});

export default model<iPaymentData>("payments", paymentModel);