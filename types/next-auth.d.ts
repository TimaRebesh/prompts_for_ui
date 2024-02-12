import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserType } from "./types";

declare module "next-auth" {
  interface User extends UserType {}
  interface Session {
    user: User;
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     isAdmin: boolean;
//   }
// }
