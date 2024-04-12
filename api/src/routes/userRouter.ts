import Router from "express";
import UserController from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.get("/auth", authMiddleware, UserController.check);

export default router;
