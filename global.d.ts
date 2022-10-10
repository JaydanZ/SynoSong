declare namespace NodeJs {
  interface ProcessEnv {
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    NEXTAUTH_URL: string;
    baseURL: string;
    JWT_SECRET: string;
  }
}
