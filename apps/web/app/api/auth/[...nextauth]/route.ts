import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import  CredentialsProvider  from "next-auth/providers/credentials";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [

    GoogleProvider({
      clientId: process.env.CLIENT_ID ?? "",
      clientSecret: process.env.CLIENT_SECRET ?? "",
    }),

    CredentialsProvider({
      name:"Credentials",
      credentials: {
        email: {label:"Email",type:"email",placeholder:"jsmith@gmail.com"},
        password: {label:"Password",type:"password"}
      },
      
      async authorize(credentials){
        if(!credentials?.email || !credentials?.password){
          throw new Error("Invalid Credentials!");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          }
        })
        //Password matching is missing
        if(!user) throw new Error("Invalid Credentials!");
        return user;
      }
    })
  ],
  session:{
    strategy:"jwt", 
  },
  adapter: PrismaAdapter(prisma),

});

export { handler as GET, handler as POST };
