// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "../../../../server/db/client";
// import { env } from "@/env/server.mjs";

import { SERVER_URL } from "@/constants";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
// import { createTransport } from "nodemailer";

import { checkUser, createUser, login } from "@/services/server-api";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(SERVER_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });
  console.log("refreshed");

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID ?? "",
    //   clientSecret: process.env.GITHUB_SECRET ?? ""
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        try {
          // check to see if email and password are provided
          if (!credentials?.email || !credentials.password) {
            throw new Error("Please enter an email and password");
          }
  
          // Call userService.authenticate to handle authentication
          const data = await login({
              email: email,
              password: password
          });

          if (data.status == 401) {
            return null;
          }
          // const user = await res.json();

          // Return the authenticated user data
          return data;

        } catch (error: any) {
          // Handle authentication errors
          throw new Error(`Authentication failed: ${error.message}`);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      if (token.backendTokens && new Date().getTime() < token.backendTokens.expiresIn)
        return token;
      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard";
    },

    /*
    async signIn({ user, account, profile, email, credentials }) {
      try {
        if (account?.provider === "credentials") {
          return true;
        }

        if (account?.provider === "github") {
          const existingUser = await checkUser(user.email ?? '');

          if (!existingUser) {
            const newUser = await createUser({
              email: user.email ?? "",
              password: "GIT_PASS",
              name: user.name ?? ""
            });
            return true;
          }
          return true;
        }
      } catch (err) {
        console.error("Error in signIn:", err);
        return false;
      }
      return true;
    }
    */
  },
};

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
