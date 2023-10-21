// import { connect } from "http2";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectMongo from "../../../connectDB";
import User from "../../../models/users";

// create next-auth provider
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          await connectMongo();

          // Check if user exists in DB
          const userExist = await User.findOne({ email: user.email });

          if (!userExist) {
            // if user does not exist, create user in DB
            const response = await fetch("/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                body: JSON.stringify({ name: user.name, email: user.email }),
              },
            });

            // Check if user was created successfully
            if (response.ok) return user;
          }
        } catch (error) {
          console.log(error);
        }
        return user;
      }
    },
  },
  session: {
    jwt: true,
    maxAge: 30 * 60, // 30 minutes
  },
});
