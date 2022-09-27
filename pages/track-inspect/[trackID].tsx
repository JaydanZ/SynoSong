import React from "react";
import axios, { AxiosError } from "axios";
import type { NextPage } from "next";
import type { GetServerSideProps, GetStaticPaths } from "next";
import type {
  spotifyTokenType,
  songRequestType,
  trackListApiRes,
} from "../../types/types";
import styles from "./TrackInspectPage.module.css";
import TrackInspect from "../../components/TrackInspect/TrackInspect";
import Vibrant from "node-vibrant";

const TrackInspectPage: NextPage<{
  success: boolean;
  trackData: SpotifyApi.TrackObjectFull | undefined;
  imagePalette: number[];
  artistTopTracks: SpotifyApi.TrackObjectFull[];
  errorMessage?: string;
}> = (props) => {
  return (
    <div className={styles.container}>
      {props.success === false && (
        <h1 className={styles.errorText}>
          <span className={styles.errorTextSpan}>Error:</span> Track does not
          exist.
        </h1>
      )}
      {props.success === true && (
        <TrackInspect
          trackData={props.trackData!}
          imgPalette={props.imagePalette}
          artistTopTracks={props.artistTopTracks}
        />
      )}
    </div>
  );
};

export default TrackInspectPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Pull track ID from URL
  const trackId = context.params!.trackID;
  let res: SpotifyApi.TrackObjectFull | undefined;
  let paletteData: any;
  let artistTopTracksList: SpotifyApi.TrackObjectFull[] | undefined;

  // Spotify Credentials
  let spotifyToken: string = "";

  // Spotify Access Token Request Handler
  // ====================================================================
  const requestAccessToken = async () => {
    // Get Spotify API Access Token
    const spotifyTokenParams: spotifyTokenType = {
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
      },
      data: "grant_type=client_credentials",
    };

    const tokenResult = await axios(spotifyTokenParams);
    return tokenResult;
  };
  // ====================================================================

  // Spotify Request Tracks Handler
  // ====================================================================
  const requestTrackData = async (idInput: string[] | string) => {
    // Get song data using track ID
    const songRequestParams: songRequestType = {
      method: "GET",
      url: `https://api.spotify.com/v1/tracks/${idInput}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${spotifyToken}`,
      },
    };

    const songData = await axios(songRequestParams);
    return songData;
  };

  // Spotify Request Artist Top Tracks Handler
  // ====================================================================
  const requestArtistTopTracks = async (id: string) => {
    const tracksRequestParams: songRequestType = {
      method: "GET",
      url: `https://api.spotify.com/v1/artists/${id}/top-tracks?market=CA`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${spotifyToken}`,
      },
    };

    const tracksData = await axios(tracksRequestParams);
    return tracksData;
  };
  // ====================================================================

  // Call spotify api and fetch track data
  try {
    if (trackId !== undefined) {
      // Request spotify access token
      const tokenRes = await requestAccessToken();

      // Store token
      spotifyToken = tokenRes.data.access_token;

      // Request track data using ID
      const trackResult = await requestTrackData(trackId);

      // Pull out track data
      const trackData: SpotifyApi.TrackObjectFull = trackResult.data;

      res = trackData;

      // Get image palette
      paletteData = await Vibrant.from(res.album.images[0].url).getPalette();

      // Get First Artist Top Tracks by ID
      const artistID: string = res.artists[0].id;

      // Request data
      const artistTrackList = await requestArtistTopTracks(artistID);

      artistTopTracksList = artistTrackList.data.tracks;
    }

    return {
      props: {
        success: true,
        trackData: res,
        imagePalette: paletteData.Vibrant._rgb,
        artistTopTracks: artistTopTracksList,
      },
    };
  } catch (error) {
    let errorMsg = "Unknown error";
    if (error instanceof AxiosError) console.log(error.response?.data.message);

    return {
      props: {
        success: false,
        trackData: null,
        imagePalette: null,
        artistTopTracks: null,
        errorMessage: errorMsg,
      },
    };
  }
};
