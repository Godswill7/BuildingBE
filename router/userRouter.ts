import { Router } from "express";
import { deleteUser, registerUser, signInUser, verifyUser, viewAllUser, viewOneUser } from "../controller/userController";

const router = Router();

router.route("/create-user").post(registerUser);
router.route("/sign-in").post(signInUser);
router.route("/:userID/:token/verify-user").patch(verifyUser);
router.route("/:userID/delete").delete(deleteUser);
router.route("/view-all").get(viewAllUser);
router.route("/:userID/view-one").get(viewOneUser);

export default router;
