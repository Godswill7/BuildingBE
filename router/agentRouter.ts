import { Router } from "express";
import { deleteAgent, registerAgent, signInAgent, verifyAgent, viewAllAgent, viewOneAgent } from "../controller/agentController";

const router = Router();

router.route("/create-agent").post(registerAgent);
router.route("/sign-in-agent").post(signInAgent);
router.route("/:token/verify-agent").patch(verifyAgent);
router.route("/delete-agent").delete(deleteAgent);
router.route("/view-all-agents").get(viewAllAgent);
router.route("/:userID/view-one-agent").get(viewOneAgent);

export default router;
