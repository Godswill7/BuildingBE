import { Request, Response } from "express";
import { HTTP } from "../utils/interfaces";
import houseModel from "../model/houseModel";
import ownerModel from "../model/ownerModel";
import { Types } from "mongoose";

export const createHouse = async (req: Request, res: Response) => {
  try {
    const { ownerID } = req.params;
    const { price, location } = req.body;

    const houseOwner = await ownerModel.findById(ownerID);

    if (houseOwner?.verified && houseOwner?.token === "") {
      const house = await houseModel.create({
        price,
        location,
      });
      houseOwner.houses.push(new Types.ObjectId(house._id));
      houseOwner.save();
      house.save();
      return res.status(HTTP.CREATE).json({
        message: "House created Successful",
        data: house,
        status: HTTP.CREATE,
      });
    } else {
      return res.status(HTTP.BAD).json({
        message: "You are not allowed",
        status: HTTP.BAD,
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error creating House",
      data: error.message,
      status: HTTP.BAD,
    });
  }
};

export const viewAllHouses = async (req: Request, res: Response) => {
  try {
    const viewHouses = await houseModel.find().populate({
      path: "houses",
      options: {
        sort: {
          createdAt: -1,

        },
      },
    });;

    return res.status(HTTP.OK).json({
      message: "This are all the houses",
      data: viewHouses,
      status: HTTP.OK,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error viewing all houses",
      data: error.message,
      status: HTTP.BAD,
    });
  }
};

export const viewOneHouse = async (req: Request, res: Response) => {
  try {
    const { houseID } = req.params;

    const viewHouse = await houseModel.findById(houseID).populate({
      path: "houses",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(HTTP.OK).json({
      message: "This are all the houses",
      data: viewHouse,
      status: HTTP.OK,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error viewing all houses",
      data: error.message,
      status: HTTP.BAD,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { houseID } = req.params;

    await houseModel.findByIdAndDelete(houseID);
    return res.status(HTTP.DELETE).json({
      message: "House Deleted successfully",
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error deleting house",
      data: error.message,
      status: HTTP.BAD,
    });
  }
};
export const updateHousePrice = async (req: Request, res: Response) => {
  try {
    const { houseID } = req.params;
    const { price } = req.body;

    const findHouse = await houseModel.findById(houseID);

    const updatePrice = await houseModel.findByIdAndUpdate(
      findHouse,
      {
        price,
      },
      { new: true }
    );
    return res.status(HTTP.UPDATE).json({
      message: "Price Updated Successfully",
      data: updatePrice,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error updating house price",
    });
  }
};
