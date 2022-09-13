import styles from "./TrackItem.module.css";
import Image from "next/image";

const TrackItem: React.FC<{
  word: string;
  track: SpotifyApi.TrackObjectFull;
}> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.trackItem}>
        <div className={styles.trackImage}>
          <Image
            src={props.track.album.images[0].url}
            alt={props.track.name}
            width="100px"
            height="100px"
          />
        </div>
        <div className={styles.nameAndArtistsContainer}>
          <h1>{props.track.name}</h1>
          <div className={styles.artistsContainer}>
            {props.track.artists.map((artist, index) => (
              <h2 key={index}>{artist.name}</h2>
            ))}
          </div>
        </div>
        <div className={styles.albumName}>
          <h2>{props.track.album.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
