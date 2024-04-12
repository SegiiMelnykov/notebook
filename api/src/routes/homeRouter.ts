import Router from "express";
const router = Router();
import authMiddleware from "../middleware/authMiddleware";
import HomeController from "../controllers/homeController";

router.get(
  "/get-by-nested-level/",
  authMiddleware,
  HomeController.getAllByLevelNested,
);

export default router;
