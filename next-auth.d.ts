import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "STUDENT" | "FACULTY";
    } & DefaultSession["user"];
  }

  interface User {
    role: "STUDENT" | "FACULTY";
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: "STUDENT" | "FACULTY";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "STUDENT" | "FACULTY";
  }
}
