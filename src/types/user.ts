import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
}
export interface UserDto {
  name: string;
  email: string;
  phone: string;
}
