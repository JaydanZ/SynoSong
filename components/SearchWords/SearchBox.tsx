import React, { useRef, useState } from "react";
import styles from "./SearchBox.module.css";
import { searchSongs } from "../../services/QueryWordService";
import TrackItem from "../Tracks/TrackItem";

type tracksResponseType = {
  key: string;
  tracks: SpotifyApi.TrackObjectFull[];
};

const SearchBox = () => {
  const wordInputRef = useRef<HTMLInputElement>(null);
  const [tracksArr, setTracks] = useState<tracksResponseType[]>([]);

  const searchWordHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const wordInput: string | undefined = wordInputRef.current?.value;
    let tracksResponse: tracksResponseType[];
    if (wordInput != null) {
      const res = await searchSongs(wordInput);
      tracksResponse = res.data;
      console.log(tracksResponse);

      setTracks(tracksResponse);
    }
  };
  return (
    <div className={styles.searchBoxContainer}>
      <form onSubmit={searchWordHandler}>
        <input type="text" ref={wordInputRef} />
        <button>Search</button>
      </form>
      <div className={styles.tracksContainer}>
        {tracksArr.length !== 0 &&
          tracksArr.map((entry) =>
            entry.tracks.map((track, index) => (
              <TrackItem key={index} word={entry.key} track={track} />
            ))
          )}
      </div>
    </div>
  );
};

export default SearchBox;
