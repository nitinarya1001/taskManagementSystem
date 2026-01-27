import { Router } from "express";
import {
  createTask,
  retrieveTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//secured routes
router.route("/create").post(verifyJWT, createTask);
router.route("/retrieve").post(verifyJWT, retrieveTask);
router.route("/update").post(verifyJWT, updateTask);
router.route("/delete").delete(verifyJWT, deleteTask);

export default router;
