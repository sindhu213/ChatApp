import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "app/lib/utils";
import bcrypt from "bcrypt";
import prisma from "app/lib/prismadb";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID ?? "",
            clientSecret: process.env.CLIENT_SECRET ?? "",
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "jsmith@gmail.com",
                },
                hashedPassword: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await getUser(credentials?.email);
                if (user && credentials) {
                    const passwordMatch = await bcrypt.compare(
                        credentials?.hashedPassword,
                        user.hashedPassword!
                    );
                    if (passwordMatch) return user;
                }
                console.log("Invalid credentials");
                return null;
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },
    
    adapter: PrismaAdapter(prisma),
});

export { handler as GET, handler as POST };
