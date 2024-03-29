import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

interface UserType {
  id: string;
  username: string;
  email: string;
  password?: string;
  image?: string | null;
  isAdmin: boolean;
}

interface ProfileType {
  picture: string;
}
declare module "next-auth" {
  interface User extends UserType {}
  interface Session {
    user: User;
  }

  interface Prompt {
    _id: string;
    prompt: string;
    tag: string;
    creator: {
      email: string;
      isAdmin: boolean;
      username: string;
      _id: string;
      image: string;
    } | null;
  }

  interface Profile extends ProfileType {}

  interface LoginInputs {
    email: string;
    password: string;
  }

  interface LoginError {
    type: "email" | "password";
    message: string;
  }
}
