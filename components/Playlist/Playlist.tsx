import { useSelector, useDispatch } from "react-redux";
import { add, remove, selectPlaylist } from "../../Store/playlistSlice";
import { useSession } from "next-auth/react";
import PlaylistTrackItem from "./PlaylistTrackItem";
import { importPlaylistHandler } from "../../services/ImportPlaylist";
import styles from "./Playlist.module.css";

const Playlist: React.FC<{}> = () => {
  const { data: session } = useSession();

  console.log(session);

  const playlist = useSelector(selectPlaylist);
  const dispatch = useDispatch();

  const removeTrackHandler = (id: string) => {
    dispatch(remove(id));
  };

  const importPlaylist = async () => {
    // Import playlist into spotify account
    // We must first create a playlist on spotify

    const playlistName = "SynosongPlaylist";

    const tracks = playlist?.map((track) => {
      return track.uri;
    });

    const res = await importPlaylistHandler(
      playlistName,
      session!.user.name,
      tracks!
    );

    console.log(res);
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
        <button className={styles.importBtn} onClick={importPlaylist}>
          Import to Spotify
        </button>
      </div>
    </div>
  );
};

export default Playlist;
