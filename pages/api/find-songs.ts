import type { NextApiRequest, NextApiResponse } from "next";
import type {
  wordsResponse,
  wordApiOptionsType,
  spotifyTokenType,
  songRequestType,
  trackListObj,
  trackListApiRes,
} from "../../types/types";
import axios, { AxiosError } from "axios";

// Spotify Credentials
let spotifyToken: string = "";

// Max word limit
const MAX_WORD_LIMIT: number = 5;

// Durstenfeld Shuffle
const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

// Words API handler
// ====================================================================
const requestSynonyms = async (word: string) => {
  // Setup api call to wordsAPI to recieve synonyms
  const wordOptions: wordApiOptionsType = {
    method: "GET",
    url: `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`,
    headers: {
      "X-RapidAPI-Key": "da6c973b88msh19b8840872e0724p190532jsn566fb8a196d7",
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    },
  };

  // Extract synonyms from request

  const { data } = await axios.request(wordOptions);

  return data;
};
// ====================================================================

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
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    data: "grant_type=client_credentials",
  };

  const tokenResult = await axios(spotifyTokenParams);
  return tokenResult;
};
// ====================================================================

// Spotify Request Tracks Handler
// ====================================================================
const requestTracks = async (wordInput: string) => {
  // Get songs using synonyms from wordsAPI
  const songRequestParams: songRequestType = {
    method: "GET",
    url: `https://api.spotify.com/v1/search?q=${wordInput}&type=track&limit=5&market=CA`,
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
  res: NextApiResponse<trackListApiRes>
) {
  let trackResult: trackListApiRes;
  let errorMsg: string = "";
  try {
    if (req.method === "POST") {
      // Extract word from request
      const { word }: { word: string } = req.body;

      // Request synonyms from wordsAPI
      errorMsg = "Word not found";
      const wordsData: wordsResponse = await requestSynonyms(word);

      // Filter out all words containing spaces or dashes
      errorMsg = "No synonyms for word exist";

      let tempWordArray: string[] = [];
      if (wordsData.synonyms!.length !== 0) {
        tempWordArray = wordsData.synonyms!.filter((word: string) => {
          return !word.includes(" ") && !word.includes("-");
        });
      }

      // Randomize array for each call
      shuffleArray(tempWordArray);

      let wordArray: string[] = [];

      if (tempWordArray.length > MAX_WORD_LIMIT) {
        // Store only up to the MAX WORD LIMIT of elements from the temp array into the new array
        wordArray = tempWordArray.splice(0, MAX_WORD_LIMIT);
      } else {
        // Store words from temp array into new array
        wordArray = tempWordArray.splice(0, tempWordArray.length);
      }

      // Request Spotify Access Token
      errorMsg = "Spotify Token Request Error";
      const tokenResult = await requestAccessToken();

      // Store access token
      spotifyToken = tokenResult.data.access_token;

      // Request song data using synonyms
      errorMsg = "Spotify Tracks Request Error";
      const trackRes: trackListObj = await Promise.all(
        wordArray.map(async (word: string) => {
          // Send a request for each word
          const res = await requestTracks(word);
          return {
            key: word,
            tracks: res.data.tracks.items,
          };
        })
      );

      trackResult = {
        success: true,
        tracks: trackRes,
        error: undefined,
      };

      res.status(201).json(trackResult);
    }
  } catch (error: AxiosError | unknown) {
    // let errorMessage = "Unknown Error";

    if (error instanceof AxiosError) console.log(error.response?.data);

    trackResult = {
      success: false,
      tracks: undefined,
      error: errorMsg,
    };
    return res.status(404).json(trackResult);
  }
}
