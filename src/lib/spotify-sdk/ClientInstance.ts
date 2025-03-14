import {
  type AccessToken,
  type IAuthStrategy,
  type SdkConfiguration,
  type SdkOptions,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk";
import { getSession, signIn } from "next-auth/react";

/**
 * A class that implements the IAuthStrategy interface for server-side Spotify API calls.
 * It uses the access token passed directly to it rather than trying to get it from the session.
 */
class ServerSideAuthStrategy implements IAuthStrategy {
  private accessToken: string | undefined;

  constructor(accessToken?: string) {
    this.accessToken = accessToken;
  }

  public getOrCreateAccessToken(): Promise<AccessToken> {
    return this.getAccessToken();
  }

  public async getAccessToken(): Promise<AccessToken> {
    if (!this.accessToken) {
      throw new Error("No access token provided");
    }

    return {
      access_token: this.accessToken,
      token_type: "Bearer",
      expires_in: 3600, // Default expiry
    } as AccessToken;
  }

  public removeAccessToken(): void {
    this.accessToken = undefined;
  }

  public setAccessToken(token: string): void {
    this.accessToken = token;
  }

  public setConfiguration(configuration: SdkConfiguration): void {
    console.warn("[Spotify-SDK][WARN]\nsetConfiguration not implemented");
  }
}

/**
 * A class that implements the IAuthStrategy interface and wraps the NextAuth functionality.
 * It retrieves the access token and other information from the JWT session handled by NextAuth.
 * This is intended for client-side use.
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

/**
 * Creates a Spotify API client with the provided access token for server-side use
 */
export function createServerSideClient(accessToken: string, config?: SdkOptions) {
  const strategy = new ServerSideAuthStrategy(accessToken);
  return new SpotifyApi(strategy, config);
}

/**
 * Creates a Spotify API client using NextAuth session for client-side use
 */
export function createClientSideClient(config?: SdkOptions) {
  const strategy = new NextAuthStrategy();
  return new SpotifyApi(strategy, config);
}

// Default export for backward compatibility
export default createServerSideClient;
