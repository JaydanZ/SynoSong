import Image from "next/image";
import TrackPlayer from "../TrackPlayer/TrackPlayer";
import styles from "./TrackInspect.module.css";

const TrackInspect: React.FC<{
  trackData: SpotifyApi.TrackObjectFull;
}> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.trackContainer}>
        <div className={styles.trackImageContainer}>
          <Image
            src={props.trackData.album.images[0].url}
            alt={props.trackData.name}
            height="350px"
            width="350px"
          />
        </div>
        <div className={styles.trackInfoContainer}>
          <h1 className={styles.trackName}>{props.trackData.name}</h1>
          <h1 className={styles.trackAlbum}>{props.trackData.album.name}</h1>
          <div className={styles.trackArtistsContainer}>
            {props.trackData.artists.map((artist, index) => (
              <h1 key={index} className={styles.trackArtists}>
                {artist.name}
              </h1>
            ))}
          </div>
        </div>
      </div>
      {props.trackData.preview_url === null && <h1>No Preview Exists</h1>}
      {props.trackData.preview_url !== null && (
        <TrackPlayer trackURL={props.trackData.preview_url} />
      )}
    </div>
  );
};

export default TrackInspect;
