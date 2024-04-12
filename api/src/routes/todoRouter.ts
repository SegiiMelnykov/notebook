import Router from "express";
import authMiddleware from "../middleware/authMiddleware";
import TodoController from "../controllers/todo/todoController";

const router = Router();
router.post("/", authMiddleware, TodoController.create);
router.get("/", authMiddleware, TodoController.getTodos);

export default router;
