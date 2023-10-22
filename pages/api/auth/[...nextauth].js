import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectMongo from "../../../connectDB";
import User from "../../../models/users";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          await connectMongo();

          const userExist = await User.findOne({ email: user.email });

          if (!userExist) {
            const response = await fetch("/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: user.name, email: user.email }),
            });

            if (response.ok) return user;
          }
        } catch (error) {
          console.log(error);
        }
        return user;
      }
    },
  },
  // jwt: {
  //   secret: process.env.JWT_SECRET,
  // },
  session: {
    jwt: true,
    maxAge: 30 * 60, // 30 minutes
    async getSession(session, user) {
      const email = session.user.email;

      session.user.email = email;

      return session;
    },
  },
};
export default NextAuth(authOptions);
