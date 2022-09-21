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
export type randomWordRequestOptions = {
  method: string;
  url: string;
  headers: {
    "Content-Type": string;
  };
};

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

export type trackListApiRes = {
  success: boolean;
  tracks?: trackListObj;
  error?: string;
};

// ======================================================

// CLIENT TYPES
// ======================================================

export type trackInspectType = {
  token: string;
  track: SpotifyApi.TrackObjectFull;
};

// ======================================================
