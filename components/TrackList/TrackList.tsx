import type { trackListObj } from "../../types/types";
import TrackItem from "../Tracks/TrackItem";
import styles from "./TrackList.module.css";

const TrackList: React.FC<{ tracks: trackListObj | undefined }> = (props) => {
  return (
    <div className={styles.tracksContainer}>
      {props.tracks?.map((entry) =>
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
  );
};

export default TrackList;
