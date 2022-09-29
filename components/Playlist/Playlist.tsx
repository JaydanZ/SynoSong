import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, selectPlaylist } from "../../Store/playlistSlice";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import PlaylistTrackItem from "./PlaylistTrackItem";
import { importPlaylistHandler } from "../../services/ImportPlaylist";
import { IoClose } from "react-icons/io5";
import styles from "./Playlist.module.css";

const Playlist: React.FC<{}> = () => {
  const [isImporting, setImportState] = useState<boolean>(false);
  const [importError, setImportError] = useState<boolean>(false);
  const playlistName = useRef<HTMLInputElement>(null);

  const { data: session } = useSession();

  console.log(session);

  const playlist = useSelector(selectPlaylist);
  const dispatch = useDispatch();

  const removeTrackHandler = (id: string) => {
    dispatch(remove(id));
  };

  const importPlaylist = async (event: React.FormEvent) => {
    event.preventDefault();
    setImportError(false);
    // Import playlist into spotify account
    // We must first create a playlist on spotify

    if (playlistName?.current?.value.length === 0) {
      setImportError(true);
      return;
    }

    const tracks = playlist?.map((track) => {
      return track.uri;
    });

    const res = await importPlaylistHandler(
      playlistName!.current!.value,
      session!.user.name,
      tracks!
    );

    toast.success("Playlist imported successfully!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toggleImportState = () => {
    const prevState = isImporting;
    setImportState(!prevState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.playlistContainer}>
        <h1 className={styles.playlistHeader}>My Playlist</h1>
        <div className={styles.playlistContent}>
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
        {!isImporting && (
          <button
            className={styles.openImportFormBtn}
            onClick={toggleImportState}
          >
            Import to Spotify
          </button>
        )}

        {isImporting && (
          <form onSubmit={importPlaylist} className={styles.importForm}>
            <div className={styles.importHeaderContainer}>
              <h1 className={styles.importHeader}>Import Playlist</h1>
              <div
                className={styles.closeImportFormBtn}
                onClick={toggleImportState}
              >
                <IoClose />
              </div>
            </div>
            {importError === true && (
              <h1 className={styles.importError}>
                Error: Input field cannot be blank.
              </h1>
            )}
            <input
              type="text"
              placeholder="Playlist Name"
              className={styles.importNameField}
              ref={playlistName}
            />
            <button type="submit" className={styles.importBtn}>
              Import
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Playlist;
