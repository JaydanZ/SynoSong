import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { insertList, selectTrackList } from "../../Store/trackListSlice";
import { findSongs } from "../../services/FindSongs";
import { generateWord } from "../../services/GenerateWord";
import { toast } from "react-toastify";
import TrackList from "../TrackList/TrackList";
import type { trackListObj, trackListApiRes } from "../../types/types";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  // States
  const wordInputRef = useRef<HTMLInputElement>(null);
  const [searchError, setSearchError] = useState<boolean>(false);
  const [searchState, setSearchState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const trackList = useSelector(selectTrackList);
  const dispatch = useDispatch();

  const validateApiResponse = (res: trackListApiRes) => {
    if (res.tracks !== undefined && res.tracks?.length > 0) {
      const tracksResponse: trackListObj = res.tracks;

      dispatch(insertList(tracksResponse));

      toast.success("Tracks Loaded!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (res.tracks?.length === 0) {
      toast.error("No results found for generated word.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(res.error!.toString(), {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const searchWordHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSearchState(true);

    const wordInput: string | undefined = wordInputRef.current?.value;

    setSearchError(false);

    if (wordInput != null) {
      if (/\d/.test(wordInput)) {
        setSearchError(true);
        setLoading(false);
        return;
      }
      const res = await findSongs(wordInput);

      validateApiResponse(res);
      setLoading(false);
    }
  };

  const generateWordHandler = async () => {
    setLoading(true);
    setSearchState(true);

    // Fetch random word from API
    const randomWord = await generateWord();

    if (randomWord.success === false) {
      toast.error(randomWord.error?.toString(), {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setLoading(false);
      return;
    }

    // Generate synonyms from word and fetch songs from spotify API
    const tracks = await findSongs(randomWord.word!);

    validateApiResponse(tracks);

    if (wordInputRef.current && randomWord.word) {
      wordInputRef.current.value = randomWord.word;
    }

    setLoading(false);
  };

  return (
    <div className={styles.searchBoxContainer}>
      {searchState === false && (
        <React.Fragment>
          {" "}
          <h2 className={styles.searchCTA}>
            Discover new music using <span>Synonyms.</span>
          </h2>
          <h3 className={styles.searchSubHeader}>
            Enter any word and we will help you find new music.
          </h3>
        </React.Fragment>
      )}
      <form onSubmit={searchWordHandler} className={styles.searchForm}>
        <input
          type="text"
          ref={wordInputRef}
          className={styles.searchField}
          placeholder="Word..."
        />
        <button className={styles.searchBtn}>Search</button>
      </form>
      <h1 className={styles.generateWordHeader}>Or</h1>
      <button className={styles.generateWordBtn} onClick={generateWordHandler}>
        Generate Random Word
      </button>
      {searchError === true && (
        <h1 className={styles.searchError}>
          Error: Input cannot contain numbers or special characters.
        </h1>
      )}

      {loading && <h1>Loading...</h1>}

      {!loading && (
        <div className={styles.tracksContainer}>
          {trackList?.length !== 0 && <TrackList tracks={trackList} />}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
