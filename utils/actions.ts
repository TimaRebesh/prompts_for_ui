"use server";
import User from "@models/user";
import { connectToDB } from "@utils/connection";
import { LoginInputs } from "next-auth";
import bcrypt from "bcryptjs";

export const checkLoginCredentials = async ({
  email,
  password,
}: LoginInputs) => {
  try {
    connectToDB();
    const user = await User.findOne({ email });
    if (!user) {
      return { message: "email is not exist", type: "email" };
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      new Error("Password is not correct");
      return { message: "password is not correct", type: "password" };
    }
    return { type: "success" };
  } catch (err: any) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
