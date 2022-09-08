import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  words: string[];
};

type wordApiOptions = {
  method: string;
  url: string;
  headers: {
    "X-RapidAPI-Key": string;
    "X-RapidAPI-Host": string;
  };
};

// Durstenfeld Shuffle
const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { word }: { word: string } = req.body;

    const options: wordApiOptions = {
      method: "GET",
      url: `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`,
      headers: {
        "X-RapidAPI-Key": "da6c973b88msh19b8840872e0724p190532jsn566fb8a196d7",
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
      },
    };

    const { data } = await axios.request(options);

    const tempWordArray: string[] = data.synonyms.filter((word: string) => {
      return !word.includes(" ") && !word.includes("-");
    });

    shuffleArray(tempWordArray);

    const wordArray: string[] = tempWordArray.splice(0, 4);

    const wordObj: Data = {
      words: wordArray,
    };

    res.status(201).json(wordObj);
  }
}
