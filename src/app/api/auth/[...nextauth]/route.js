import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";

const handeler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "927868843218-gu1g91e7898kvf19p7moa537fr6sc3in.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    FacebookProvider({
      clientId: "7813470598737534",
      clientSecret: "66bf3908928a5413d7ac7c15279cd5c1",
    }),
    AppleProvider({
      clientId: "7813470598737534",
      clientSecret: "66bf3908928a5413d7ac7c15279cd5c1",
    }),
  ],
});

export { handeler as GET, handeler as POST };
