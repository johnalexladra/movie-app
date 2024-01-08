// import NextAuth, { User, DefaultSession, DefaultJWT } from "next-auth";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }

  // interface Session extends DefaultSession {
  //   user: {
  //     id: string;
  //   } & DefaultSession["user"]; 
  //   accessToken?: string;
  // }

  // interface User {
  //   id: string | number;
  //   accessToken?: string;
  // }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    // userId: string;
    user: {
      id: number;
      email: string;
      name: string;
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
