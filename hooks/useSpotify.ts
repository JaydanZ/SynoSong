import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";

function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // If refresh access token attempt fails, direct user to login...
      console.log("checking session");

      if (session.error === "RefreshAccessTokenError") {
        signIn();
        return;
      }
    }
  }, [session]);
  return;
}

export default useSpotify;
