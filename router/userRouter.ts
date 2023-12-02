import { Router } from "express"
import { deleteUser, registerUser, signInUser, verifyUser, viewAllUser, viewOneUser } from "../controller/userController";

const router = Router();

router.route("/create").post(registerUser);
router.route("/sign-in").post(signInUser);
router.route("/:token/verify").patch(verifyUser);
router.route("/delete").delete(deleteUser);
router.route("/view-all").get(viewAllUser);
router.route("/:userID/view-one").get(viewOneUser);

export default router