import type { NextApiRequest, NextApiResponse } from "next";
import type {
  spotifyTokenType,
  trackListObj,
  songRequestType,
} from "../../types/types";
import axios from "axios";

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
const requestTrackData = async (idInput: string[]) => {
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

// ====================================================================

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<trackListObj | any>
) {
  try {
    if (req.method === "POST") {
      // Extract data from request
      const { id }: { id: string[] } = req.body;

      // Request access token from spotify API
      const tokenResult = await requestAccessToken();

      // Store token
      spotifyToken = tokenResult.data.access_token;

      // Request track data using ID
      const trackResult = await requestTrackData(id);

      // Pull out track data
      const trackData: SpotifyApi.TrackObjectFull = trackResult.data;

      res.status(201).json(trackData);
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e });
  }
}
