import { useSelector, useDispatch } from "react-redux";
import { add, remove, selectPlaylist } from "../../Store/playlistSlice";
import PlaylistTrackItem from "./PlaylistTrackItem";
import styles from "./Playlist.module.css";

const Playlist: React.FC<{}> = () => {
  const playlist = useSelector(selectPlaylist);
  const dispatch = useDispatch();

  const removeTrackHandler = (id: string) => {
    dispatch(remove(id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.playlistContainer}>
        <h1 className={styles.playlistHeader}>My Playlist</h1>
        {playlist !== undefined &&
          playlist.length !== 0 &&
          playlist.map((track) => (
            <PlaylistTrackItem
              key={track.id}
              id={track.id}
              name={track.name}
              album={track.album}
              albumCover={track.albumCover}
              artists={track.artists}
              onRemoveTrack={removeTrackHandler}
            />
          ))}
      </div>
    </div>
  );
};

export default Playlist;
