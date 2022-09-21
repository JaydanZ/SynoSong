import axios from "axios";
import type { songQueryType, trackListApiRes } from "../models/types";

export const findSongs = async (data: string) => {
  const options: songQueryType = {
    method: "POST",
    url: "/api/find-songs",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ word: data }),
  };
  const response = await axios(options);
  const trackRes: trackListApiRes = response.data;
  return trackRes;
};

export const findSpecificSong = async (data: string | string[]) => {
  const options: songQueryType = {
    method: "POST",
    url: "/api/find-specific-song",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ id: data }),
  };
  const response = await axios(options);
  return response;
};
