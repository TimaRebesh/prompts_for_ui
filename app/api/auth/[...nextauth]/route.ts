import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/connection";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (profile) {
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
        } catch (error: any) {
          console.log("Error checking if user exists: ", error.message);
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
      session.user.isAdmin = sessionUser.isAdmin as boolean;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
