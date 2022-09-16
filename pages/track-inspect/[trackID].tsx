import React from "react";
import axios from "axios";
import type { NextPage } from "next";
import type { GetStaticProps, GetStaticPaths } from "next";
import type { spotifyTokenType, songRequestType } from "../../models/types";
import styles from "./TrackInspectPage.module.css";
import TrackInspect from "../../components/Tracks/TrackInspect";

const TrackInspectPage: NextPage<{
  trackData: SpotifyApi.TrackObjectFull | undefined;
}> = (props) => {
  return (
    <div className={styles.container}>
      {props.trackData === undefined && (
        <h1 className={styles.errorText}>
          <span className={styles.errorTextSpan}>Error:</span> Track does not
          exist.
        </h1>
      )}
      {props.trackData !== undefined && (
        <TrackInspect trackData={props.trackData} />
      )}
    </div>
  );
};

export default TrackInspectPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // Pull track ID from URL
  const trackId = context.params!.trackID;
  let res: SpotifyApi.TrackObjectFull | undefined;

  // Spotify Credentials
  const CLIENT_ID: string = "f5320cc39bfc4127b45d2c0441abea20";
  const CLIENT_SECRET: string = "25f00babfdfb49f88ab8e7c00640c214";
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
          Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
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
    // Get songs using synonyms from wordsAPI
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

  // Call spotify api and fetch track data
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
  }

  return {
    props: {
      trackData: res,
    },
  };
};
