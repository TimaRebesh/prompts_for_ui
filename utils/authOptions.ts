import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/connection";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/user";
import bcrypt from "bcryptjs";

const login = async (
  credentials: Record<"email" | "password", string> | undefined
) => {
  try {
    connectToDB();
    const user = await User.findOne({ email: credentials!.email });

    if (!user) {
      throw new Error("email has not been found");
    }

    const isPasswordCorrect = await bcrypt.compare(
      credentials!.password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new Error("Password is not correct");
    }

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login");
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (profile && account?.provider === "google") {
        try {
          await connectToDB();
          const { email, picture } = profile;
          const user = await User.findOne({ email });
          if (!user) {
            const newUser = new User({
              username: profile?.name?.trim(),
              image: picture,
              email,
            });
            await newUser.save();
          }
        } catch (error: unknown) {
          console.log(
            "Error checking if user exists: ",
            (error as Error).message
          );
          return false;
        }
      }
      return true;
    },
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      session.user.username = sessionUser.username;
      session.user.image = sessionUser.image;
      session.user.isAdmin = sessionUser.isAdmin as boolean;
      return session;
    },
  },
};
