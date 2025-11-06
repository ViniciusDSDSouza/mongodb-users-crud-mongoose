import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} from "../services/userService";
import { UserDto } from "../types/user";

export async function getUsersController(_req: Request, res: Response) {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
    console.error(error);
  }
}

export async function createUserController(
  req: Request<{}, {}, UserDto>,
  res: Response
) {
  try {
    const { name, email, phone } = req.body;
    const user = await createUser({ name, email, phone });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
    console.error(error);
  }
}

export async function getUserByIdController(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;
    const user = await getUserById(new ObjectId(id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
    console.error(error);
  }
}

export async function updateUserController(
  req: Request<{ id: string }, {}, UserDto>,
  res: Response
) {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const user = await updateUser(new ObjectId(id), { name, email, phone });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
    console.error(error);
  }
}

export async function deleteUserController(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;
    await deleteUser(new ObjectId(id));
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
    console.error(error);
  }
}
