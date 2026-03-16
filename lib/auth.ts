import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { LoginSchema } from "@/lib/schemas";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
          console.log("Auth Debug: Credentials received", {
            email: credentials.email,
            role: credentials.role
          });

          const validatedFields = LoginSchema.safeParse(credentials);
          
          if (!validatedFields.success) {
            console.log("Auth: Validation failed", validatedFields.error.format());
            return null;
          }

          const { email, password, role } = validatedFields.data;

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            console.log("Auth: User not found or no password", email);
            return null;
          }
          
          console.log("Auth Debug: Role comparison", {
            dbRole: user.role,
            providedRole: role,
            match: String(user.role).toUpperCase() === String(role).toUpperCase()
          });

          if (String(user.role).toUpperCase() !== String(role).toUpperCase()) {
             throw new Error("Invalid login portal for your account. Please use the correct sign in page.");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;

          return null;
      },
    }),
],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as "STUDENT" | "FACULTY" | "ADMIN";
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await prisma.user.findUnique({
        where: { id: token.sub },
      });

      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
  },
});
