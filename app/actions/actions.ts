"use server";

import { signIn } from "@app/api/auth/[...nextauth]/route";
import User from "@models/user";
import { connectToDB } from "@utils/connection";
import { LoginInputs } from "next-auth";

export const loginAction = async ({ email, password }: LoginInputs) => {
  try {
    connectToDB();
    const user = await User.findOne({ email });
    if (!user) {
      return { message: "email is not exist", type: "email" };
    }
    if (user.password !== password) {
      return { message: "password is not correct", type: "password" };
    }
    console.log("enter");
    await signIn("credentials", {
      email,
      password,
    });
  } catch (err: any) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
