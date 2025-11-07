import { Request, Response } from "express";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} from "../services/userService";
import { UserDto, UserDtoSchema } from "../models/user";
import { toObjectId } from "../utils/objectId";

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
    const isValid = UserDtoSchema.safeParse(req.body);

    if (!isValid.success) {
      return res.status(400).json({
        errors: isValid.error.issues.map((issue) => issue.message),
      });
    }

    const user = await createUser(isValid.data);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
}

export async function getUserByIdController(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const id = toObjectId(req.params.id);
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
}

export async function updateUserController(
  req: Request<{ id: string }, {}, UserDto>,
  res: Response
) {
  try {
    const isValid = UserDtoSchema.safeParse(req.body);

    if (!isValid.success) {
      return res.status(400).json({
        errors: isValid.error.issues.map((issue) => issue.message),
      });
    }

    const id = toObjectId(req.params.id);
    const user = await updateUser(id, isValid.data);
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
    await deleteUser(toObjectId(id));
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
    console.error(error);
  }
}
