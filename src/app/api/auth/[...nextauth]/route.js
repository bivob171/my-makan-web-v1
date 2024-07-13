import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import generateAppleClientSecret from "@/utils/generateAppleClientSecret ";

const handeler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SE,
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SE,
    }),
    AppleProvider({
      clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
      clientSecret: generateAppleClientSecret,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handeler as GET, handeler as POST };
