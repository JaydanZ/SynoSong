import { useRouter } from "next/router";
import styles from "./TrackCarouselItem.module.css";
import Image from "next/image";

const TrackCarouselItem: React.FC<{
  word?: string | undefined;
  trackName: string;
  trackArtists: SpotifyApi.ArtistObjectSimplified[];
  trackAlbumName: string;
  trackAlbumImage: string;
  trackID: string;
}> = (props) => {
  const router = useRouter();

  const trackClickHandler = () => {
    router.push(`/track-inspect/${props.trackID}`);
  };

  return (
    <div className={styles.container} onClick={trackClickHandler}>
      <div className={styles.trackItem}>
        <div className={styles.trackImageContainer}>
          <Image
            src={props.trackAlbumImage}
            alt={props.trackName}
            width="350px"
            height="350px"
          />
        </div>
        <div className={styles.nameAndArtistsContainer}>
          <h1 className={styles.trackName}>{props.trackName}</h1>
          <div className={styles.artistsContainer}>
            <h2 className={styles.artistsContainerText}>
              {props.trackArtists[0].name}
            </h2>
            {props.trackArtists.length > 1 && (
              <h2 className={styles.artistsContainerText}>
                {`, ${props.trackArtists[1].name}`}
              </h2>
            )}
          </div>
          <div className={styles.albumName}>
            <h2 className={styles.albumNameText}>{props.trackAlbumName}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackCarouselItem;
