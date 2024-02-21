import {
  responseConflict409,
  responseError500,
  responseSuccess,
} from "@app/api/helpers";
import User from "@models/user";
import { connectToDB } from "@utils/connection";
import { User as UserType } from "next-auth";
import bcrypt from "bcryptjs";

export const POST = async (request: Request) => {
  const { username, email, password, isAdmin } = (await request.json()) as Omit<
    UserType,
    "id"
  >;

  try {
    await connectToDB();
    const userByName = await User.findOne({ username });
    if (userByName) {
      return responseConflict409(
        JSON.stringify({
          type: "username",
          message: "Username already exists. Please choose another name",
        })
      );
    }
    const userByEmail = await User.findOne({ email });
    if (userByEmail) {
      return responseConflict409(
        JSON.stringify({
          type: "email",
          message: "A user with the same email already exists",
        })
      );
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password as string, salt);

    const newUser = new User({
      username,
      email,
      password,
      isAdmin,
    });
    await newUser.save();
    console.log("new user is created in db");
    return responseSuccess(JSON.stringify(newUser));
  } catch (error) {
    return responseError500("Failed to create a new user");
  }
};
