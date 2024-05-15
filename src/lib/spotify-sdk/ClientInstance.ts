"use client";

import {
  type AccessToken,
  type IAuthStrategy,
  type SdkConfiguration,
  type SdkOptions,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk";
import { getSession, signIn } from "next-auth/react";

/**
 * A class that implements the IAuthStrategy interface and wraps the NextAuth functionality.
 * It retrieves the access token and other information from the JWT session handled by NextAuth.
 */
class NextAuthStrategy implements IAuthStrategy {
  public getOrCreateAccessToken(): Promise<AccessToken> {
    return this.getAccessToken();
  }

  public async getAccessToken(): Promise<AccessToken> {
    const session = await getSession();
    if (!session?.user) {
      return {} as AccessToken;
    }

    if (session?.error === "RefreshAccessTokenError") {
      await signIn();
      return this.getAccessToken();
    }

    const { user } = session;

    return {
      access_token: user.accessToken,
      token_type: "Bearer",
      expires_in: user.expiresIn,
      expires: user.expiresAt,
      refresh_token: user.refreshToken,
    } as AccessToken;
  }

  public removeAccessToken(): void {
    console.warn("[Spotify-SDK][WARN]\nremoveAccessToken not implemented");
  }

  public setConfiguration(configuration: SdkConfiguration): void {
    console.warn("[Spotify-SDK][WARN]\nsetConfiguration not implemented");
  }
}

function withNextAuthStrategy(config?: SdkOptions) {
  const strategy = new NextAuthStrategy();
  return new SpotifyApi(strategy, config);
}

export default withNextAuthStrategy();
