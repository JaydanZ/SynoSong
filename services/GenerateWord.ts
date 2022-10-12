import axios, { AxiosError } from "axios";
import { randomWordRequestOptions } from "../types/types";

type RandomWordRes = {
  success: boolean;
  word?: string;
  error?: string;
};

export const generateWord = async () => {
  const options: randomWordRequestOptions = {
    method: "GET",
    url: "https://random-word-form.herokuapp.com/random/noun",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res: RandomWordRes = {
    success: true,
    word: "",
    error: "",
  };

  try {
    const apiRes = await axios(options);
    res.word = apiRes.data[0];
  } catch (error: AxiosError | unknown) {
    if (error instanceof AxiosError) res.error = error.response?.data;
    res.success = false;
  }

  return res;
};
