import axios from "axios";
import type { songQueryType } from "../models/types";

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
  return response;
};

export const findSpecificSong = async (data: string) => {
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
