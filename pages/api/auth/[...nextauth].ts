import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from 'lib/prisma';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  // pages: {
  //   signIn: '/',
  //   signOut: '/',
  //   error: '/',
  //   verifyRequest: '/',
  // },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
});