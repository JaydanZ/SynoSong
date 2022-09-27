import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    accessTokenExpires: number;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      email: string;
      name: string;
      refreshToken: string;
      username: string;
    };
  }
}
