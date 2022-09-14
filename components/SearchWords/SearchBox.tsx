import React, { useRef, useState } from "react";
import styles from "./SearchBox.module.css";
import { findSongs, findSpecificSong } from "../../services/FindSongsService";
import TrackItem from "../Tracks/TrackItem";
import type { trackListObj } from "../../models/types";

const SearchBox = () => {
  const wordInputRef = useRef<HTMLInputElement>(null);
  const [tracksArr, setTracks] = useState<trackListObj>([]);

  const searchWordHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const wordInput: string | undefined = wordInputRef.current?.value;
    let tracksResponse: trackListObj;

    if (wordInput != null) {
      const res = await findSongs(wordInput);
      tracksResponse = res.data;

      console.log(tracksResponse);
      setTracks(tracksResponse);
    }
  };

  const trackInspectHandler = async (href: string) => {
    if (href != null) {
      const res = await findSpecificSong(href);
      console.log(res);
    }
    return;
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
              <TrackItem
                key={index}
                word={entry.key}
                trackName={track.name}
                trackArtists={track.artists}
                trackAlbumName={track.album.name}
                trackAlbumImage={track.album.images[0].url}
                trackID={track.id}
              />
            ))
          )}
      </div>
    </div>
  );
};

export default SearchBox;
