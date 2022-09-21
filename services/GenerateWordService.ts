import axios from "axios";
import { randomWordRequestOptions } from "../models/types";

export const generateWord = async () => {
  const options: randomWordRequestOptions = {
    method: "GET",
    url: "https://random-word-form.herokuapp.com/random/noun",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await axios(options);
  return res;
};
