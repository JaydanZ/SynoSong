// SERVICE TYPES
// ======================================================
export type songQueryType = {
  method: string;
  url: string;
  headers: {
    "Content-Type": string;
  };
  data: string | undefined;
};
// ======================================================

// API TYPES
// ======================================================
export type wordsResponse = {
  word: string;
  synonyms: string[];
};

export type wordApiOptionsType = {
  method: string;
  url: string;
  headers: {
    "X-RapidAPI-Key": string;
    "X-RapidAPI-Host": string;
  };
};

export type spotifyTokenType = {
  method: string;
  url: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
  data: string;
};

export type songRequestType = {
  method: string;
  url: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
};

export type trackListObj = {
  key: string;
  tracks: SpotifyApi.TrackObjectFull[];
}[];
// ======================================================
