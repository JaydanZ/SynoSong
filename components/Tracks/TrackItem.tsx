import styles from "./TrackItem.module.css";
import Image from "next/image";

const TrackItem: React.FC<{
  word: string;
  trackName: string;
  trackArtists: SpotifyApi.ArtistObjectSimplified[];
  trackAlbumName: string;
  trackAlbumImage: string;
  trackHREF: string;
  onTrackInspect: (uri: string) => void;
}> = (props) => {
  const trackClickHandler = () => {
    props.onTrackInspect(props.trackHREF);
  };
  return (
    <div className={styles.container} onClick={trackClickHandler}>
      <div className={styles.trackItem}>
        <div className={styles.trackImage}>
          <Image
            src={props.trackAlbumImage}
            alt={props.trackName}
            width="100px"
            height="100px"
          />
        </div>
        <div className={styles.nameAndArtistsContainer}>
          <h1>{props.trackName}</h1>
          <div className={styles.artistsContainer}>
            {props.trackArtists.map((artist, index) => (
              <h2 key={index}>{artist.name}</h2>
            ))}
          </div>
        </div>
        <div className={styles.albumName}>
          <h2>{props.trackAlbumName}</h2>
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
