declare namespace NodeJs {
  interface ProcessEnv {
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    HOSTNAME: string;
    NEXTAUTH_URL: string;
    JWT_SECRET: string;
  }
}
