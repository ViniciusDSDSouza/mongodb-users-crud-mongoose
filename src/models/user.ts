import { Schema, model } from "mongoose";
import z from "zod";

export const UserDtoSchema = z.object({
  name: z
    .string({ error: "Name should be a string" })
    .min(1, "Name is required"),
  email: z.email({ error: "Invalid email" }).min(1, "Email is required"),
  phone: z
    .string({ error: "Phone should be a string" })
    .min(1, "Phone is required"),
});

export type UserDto = z.infer<typeof UserDtoSchema>;

export const UserSchema = new Schema<UserDto>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { versionKey: false }
);

export const UserModel = model<UserDto>("User", UserSchema);
