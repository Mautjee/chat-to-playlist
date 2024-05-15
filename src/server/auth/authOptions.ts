/* eslint-disable @typescript-eslint/require-await */
import { type GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions } from "next-auth";

import { env } from "@/env.mjs";
import spotifyProfile from "./spotifyProfile";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  providers: [spotifyProfile],
  session: {
    maxAge: 60 * 60, // 1 hour
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account?.access_token;
        token.tokenType = account?.token_type;
        token.expiresAt = account?.expires_at ?? Date.now() / 1000;
        token.expiresIn = (account?.expires_at ?? 0) - Date.now() / 1000;
        token.refreshToken = account?.refresh_token;
        token.scope = account?.scope;
      }
      // if (Date.now() < account.expires_at) {
      //   return refreshAccessToken(updatedToken);
      // }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  debug: env.NODE_ENV === "development",
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
