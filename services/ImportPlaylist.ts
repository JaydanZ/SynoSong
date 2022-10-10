import axios, { AxiosError } from "axios";
import type { importPlaylistRes } from "../types/types";

export const importPlaylistHandler = async (
  playlistName: string,
  user: string,
  trackUris: string[]
) => {
  try {
    const options = {
      method: "POST",
      url: `/api/import-playlist`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        playlistName: playlistName,
        trackUris: trackUris,
        user: user,
      },
    };
    const { data } = await axios(options);

    const importRes: importPlaylistRes = data;
    return importRes;
  } catch (error: AxiosError | unknown) {
    let errorMessage = "unknown_error";

    if (error instanceof AxiosError) errorMessage = error.response?.data;

    const importError: importPlaylistRes = {
      success: false,
      message: errorMessage,
    };

    return importError;
  }
};
