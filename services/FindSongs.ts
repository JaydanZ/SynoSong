import axios, { AxiosError } from "axios";
import type { songQueryType, trackListApiRes } from "../types/types";

export const findSongs = async (data: string) => {
  const options: songQueryType = {
    method: "POST",
    url: `/api/find-songs`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ word: data }),
  };

  // ===============================
  // ERROR MUST BE HANDLED HERE
  // ===============================

  let trackRes: trackListApiRes = {
    success: false,
  };

  try {
    const response = await axios(options);
    trackRes = response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      trackRes = err.response?.data;
    }
  }

  return trackRes;
};
