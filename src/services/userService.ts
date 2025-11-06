import { ObjectId } from "mongodb";
import { mongoDatabase } from "../db/client";
import { User, UserDto } from "../types/user";

export async function getUsers(): Promise<User[]> {
  const users = await mongoDatabase.collection<User>("users").find().toArray();
  return users;
}

export async function createUser(user: UserDto): Promise<User> {
  const result = await mongoDatabase
    .collection<UserDto>("users")
    .insertOne(user);

  const newUser = {
    _id: result.insertedId,
    ...user,
  };

  return newUser;
}

export async function getUserById(_id: ObjectId): Promise<User | null> {
  const user = await mongoDatabase.collection<User>("users").findOne({ _id });
  return user;
}

export async function updateUser(
  _id: ObjectId,
  user: UserDto
): Promise<User | null> {
  const result = await mongoDatabase
    .collection<User>("users")
    .updateOne({ _id }, { $set: user });
  return result.acknowledged ? { _id, ...user } : null;
}

export async function deleteUser(_id: ObjectId): Promise<boolean> {
  const result = await mongoDatabase
    .collection<User>("users")
    .deleteOne({ _id });
  return result.deletedCount > 0;
}
