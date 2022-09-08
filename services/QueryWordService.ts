import axios from "axios";

type searchSongType = {
  method: string;
  url: string;
  headers: {
    "Content-Type": string;
  };
  data: string | undefined;
};

export const searchSongs = async (data: string) => {
  const options: searchSongType = {
    method: "POST",
    url: "/api/query-word",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ word: data }),
  };
  const response = await axios(options);
  return response;
};
