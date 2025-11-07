import { ObjectId } from "mongodb";
import { UserDto, UserModel } from "../models/user";

export async function getUsers(): Promise<UserDto[]> {
  const users = await UserModel.find();
  return users;
}

export async function createUser(user: UserDto): Promise<UserDto> {
  const newUser = await UserModel.create(user);
  return newUser;
}

export async function getUserById(_id: ObjectId): Promise<UserDto | null> {
  const user = await UserModel.findById(_id);
  return user;
}

export async function updateUser(
  _id: ObjectId,
  user: UserDto
): Promise<UserDto | null> {
  const result = await UserModel.findByIdAndUpdate(_id, user, { new: true });
  return result;
}

export async function deleteUser(_id: ObjectId): Promise<boolean> {
  const result = await UserModel.findByIdAndDelete(_id);
  return result ? true : false;
}
