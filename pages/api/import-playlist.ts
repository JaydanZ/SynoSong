import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import type { importPlaylistRes } from "../../types/types";

const createPlaylist = async (
  playlistName: string,
  accessToken: string,
  username: string
) => {
  const options = {
    method: "POST",
    url: `https://api.spotify.com/v1/users/${username}/playlists`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      name: `${playlistName}`,
    },
  };

  const res = await axios(options);
  return res;
};

const importPlaylist = async (
  playlistId: string,
  accessToken: string,
  trackUris: string[]
) => {
  const options = {
    method: "POST",
    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      uris: trackUris,
    },
  };

  const res = await axios(options);
  return res;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<importPlaylistRes>
) {
  try {
    const playlistName = req.body.playlistName;
    const trackUris = req.body.trackUris;
    const username = req.body.user;

    // Grab current session data
    const session = await getSession({ req });

    // Store access token
    const accessToken: string = session!.user.accessToken;

    // Now lets create the playlist in the users account
    const createPlaylistRes = await createPlaylist(
      playlistName,
      accessToken,
      username
    );

    // Store playlist ID
    const playlistId: string = createPlaylistRes.data.id;

    // Now lets import the tracks into the playlist
    const importPlaylistRes = await importPlaylist(
      playlistId,
      accessToken,
      trackUris
    );

    const importRes: importPlaylistRes = {
      success: true,
      message: "playlist_imported_successfully",
    };

    res.status(201).json(importRes);
  } catch (error: AxiosError | unknown) {
    let errorMessage = "unknown_error";

    if (error instanceof AxiosError) errorMessage = error.response?.data;

    const importError: importPlaylistRes = {
      success: false,
      message: errorMessage,
    };
    res.status(404).json(importError);
  }
}
