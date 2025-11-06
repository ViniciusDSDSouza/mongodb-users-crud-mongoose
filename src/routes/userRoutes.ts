import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
  getUsersController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController";

const userRoutes = Router();

userRoutes.get("/", getUsersController);
userRoutes.post("/", createUserController);
userRoutes.get("/:id", getUserByIdController);
userRoutes.put("/:id", updateUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
