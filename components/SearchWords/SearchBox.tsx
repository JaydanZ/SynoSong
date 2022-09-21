import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { insertList, selectTrackList } from "../../Store/trackListSlice";
import { RootState } from "../../Store/store";
import styles from "./SearchBox.module.css";
import { findSongs } from "../../services/FindSongsService";
import TrackList from "../TrackList/TrackList";
import { generateWord } from "../../services/GenerateWordService";
import type { trackListObj, trackListApiRes } from "../../models/types";

const SearchBox = () => {
  const wordInputRef = useRef<HTMLInputElement>(null);
  const [searchError, setSearchError] = useState<boolean>(false);
  const [searchState, setSearchState] = useState<boolean>(true);
  const trackList = useSelector(selectTrackList);
  const dispatch = useDispatch();

  const searchWordHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const wordInput: string | undefined = wordInputRef.current?.value;
    let apiResponse: trackListApiRes;
    setSearchError(false);

    if (wordInput != null) {
      if (/\d/.test(wordInput)) {
        setSearchError(true);
        return;
      }
      const res = await findSongs(wordInput);
      apiResponse = res;

      if (apiResponse.tracks !== undefined) {
        const tracksResponse: trackListObj = apiResponse.tracks;

        console.log(tracksResponse);
        dispatch(insertList(tracksResponse));

        setSearchState(false);
      } else {
        console.log(apiResponse.error);
      }
    }
  };

  const generateWordHandler = async () => {
    let tracksRes: trackListObj;

    // Fetch random word from API
    const randomWord = await generateWord();

    // Generate synonyms from word and fetch songs from spotify API
    const tracks = await findSongs(randomWord.data[0]);

    if (tracks.tracks !== undefined) {
      console.log(tracks.tracks);
      tracksRes = tracks.tracks;

      // Store tracks list
      dispatch(insertList(tracksRes));

      setSearchState(false);
    } else {
      console.log(tracks.error);
    }
  };

  return (
    <div className={styles.searchBoxContainer}>
      {searchState === true && (
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
      <div className={styles.tracksContainer}>
        {trackList?.length !== 0 && <TrackList tracks={trackList} />}
      </div>
    </div>
  );
};

export default SearchBox;
