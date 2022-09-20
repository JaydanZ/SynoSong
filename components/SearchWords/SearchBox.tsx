import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { insertList, selectTrackList } from "../../Store/trackListSlice";
import { RootState } from "../../Store/store";
import styles from "./SearchBox.module.css";
import { findSongs, findSpecificSong } from "../../services/FindSongsService";
import TrackList from "../TrackList/TrackList";
import type { trackListObj } from "../../models/types";

const SearchBox = () => {
  const wordInputRef = useRef<HTMLInputElement>(null);
  const [searchError, setSearchError] = useState<boolean>(false);
  const [ctaHeaderState, setCtaHeaderState] = useState<boolean>(true);
  const trackList = useSelector(selectTrackList);
  const dispatch = useDispatch();

  const searchWordHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const wordInput: string | undefined = wordInputRef.current?.value;
    let tracksResponse: trackListObj;
    setSearchError(false);

    if (wordInput != null) {
      if (/\d/.test(wordInput)) {
        setSearchError(true);
        return;
      }
      const res = await findSongs(wordInput);
      tracksResponse = res.data;

      console.log(tracksResponse);
      dispatch(insertList(tracksResponse));

      setCtaHeaderState(false);
    }
  };

  return (
    <div className={styles.searchBoxContainer}>
      {ctaHeaderState === true && (
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
      {searchError === true && (
        <h1 className={styles.searchError}>
          Error: Input cannot contain numbers or special characters.
        </h1>
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
      <div className={styles.tracksContainer}>
        {trackList?.length !== 0 && <TrackList tracks={trackList} />}
      </div>
    </div>
  );
};

export default SearchBox;
