import { type DefaultSession } from "next-auth";

export type AuthUser = {
  name?: string;
  email?: string;
  image?: string;
  id?: string;
  accessToken?: string;
  tokenType?: string;
  expiresAt?: number;
  expiresIn?: number;
  refreshToken?: string;
  scope?: string;
};
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends Omit<DefaultSession, "user"> {
    user?: AuthUser;
    expires: string;
    error: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    accessToken?: string;
    tokenType?: string;
    expiresAt?: number;
    expiresIn?: number;
    refreshToken?: string;
    scope?: string;
  }
}
