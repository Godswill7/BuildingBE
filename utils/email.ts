import nodemailer from "nodemailer";
import { google } from "googleapis";
import ejs from "ejs";
import path from "path";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const GOOGLE_ID =
  "350112565242-4qn4bpqq2k9cts6mqs7ig1r55c38q83r.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REFRESH_TOKEN =
  "1//04qqJUlI9iAtWCgYIARAAGAQSNwF-L9IrmX1rqA0KFMphKTzV60NxqDifoc7kkPiZ7QTWmkbKN10Fb9fXFvCcvvnd3q-Ro2uHx_4";
const GOOGLE_URL = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESH_TOKEN });

export const sendAccountMail = async (user: any) => {
  try {
    const getAccess: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "udidagodswill7@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: getAccess,
      },
    });

    const token = jwt.sign({ id: user._id }, process.env.SECRET!);

    const passedData = {
      url: `http://localhost:3783/api/${token}/verify-user`,
    };

    const readData = path.join(__dirname, "../views/verifyAccount.ejs");
    const data = await ejs.renderFile(readData, passedData);

    const mailer = {
      from: " <udidagodswill7@gmail.com> ",
      to: user.email,
      subject: " HousingApi",
      html: data,
    };

    transport.sendMail(mailer);
  } catch (error:any) {
    console.log(error.message);
  }
};

export const resetAccountPassword = async (user: any) => {
  try {
    const getAccess: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "udidagodswill7@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: getAccess,
      },
    });

    const token = jwt.sign({ id: user._id }, process.env.SECRET!);

    const passedData = {
      url: `http://localhost:3783/api/${token}/reset-password`,
    };

    const readData = path.join(__dirname, "../views/resetPassword.ejs");
    const data = await ejs.renderFile(readData, passedData);

    const mailer = {
      from: " <udidagodswill7@gmail.com > ",
      to: user.email,
      subject: "Welcome you can now reset your password",
      html: data,
    };

    transport.sendMail(mailer);
  } catch (error:any) {
    console.log(error.message);
  }
};

export const sendFirstAccountMail = async (student: any) => {
  try {
    const getAccess: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "udidagodswill7@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: getAccess,
      },
    });

    const token = jwt.sign({ id: student._id }, process.env.SECRET!);
    const token1 = jwt.sign({ id: student._id }, "code");

    const passedData = {
      url: `http://localhost:3783/api/${token}/student-secret-key`, 
      code: student?.secretKey,
    };

    const readData = path.join(__dirname, "../views/first.ejs");
    const data = await ejs.renderFile(readData, passedData);

    const mailer = {
      from: " <udidagodswill7@gmail.com> ",
      to: student.email,
      subject: "HousingApi",
      html: data,
    };

    transport.sendMail(mailer);
  } catch (error:any) {
    console.log(error.message);
  }
};

