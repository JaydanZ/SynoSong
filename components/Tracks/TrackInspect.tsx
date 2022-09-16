import Image from "next/image";
import styles from "./TrackInspect.module.css";
import ReactAudioPlayer from "react-audio-player";

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
      <ReactAudioPlayer
        src={props.trackData.preview_url + ".mp3"}
        controls={true}
        volume={0.2}
      />
    </div>
  );
};

export default TrackInspect;
