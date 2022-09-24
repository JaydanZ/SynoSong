import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import TrackPlayer from "../TrackPlayer/TrackPlayer";
import TrackCarousel from "../TrackCarousel/TrackCarousel";
import { FaArrowCircleLeft } from "react-icons/fa";
import styles from "./TrackInspect.module.css";

const TrackInspect: React.FC<{
  trackData: SpotifyApi.TrackObjectFull;
  imgPalette: number[];
  artistTopTracks: SpotifyApi.TrackObjectFull[] | undefined;
}> = (props) => {
  // Refs
  let containerRef = useRef<HTMLDivElement>(null);

  const generateGradient = () => {
    containerRef.current!.style.setProperty(
      "--background-clr",
      `${props.imgPalette[0]},${props.imgPalette[1]},${props.imgPalette[2]}`
    );
  };
  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.trackContainer}>
        <Link href="/">
          <a className={styles.returnBtn}>
            <FaArrowCircleLeft />
          </a>
        </Link>
        <div className={styles.trackDataContainer}>
          <div className={styles.trackImageContainer}>
            <Image
              src={props.trackData.album.images[0].url}
              alt={props.trackData.name}
              height="350px"
              width="350px"
              onLoadingComplete={generateGradient}
            />
          </div>
          <div className={styles.trackInfoContainer}>
            <h1 className={styles.trackName}>{props.trackData.name}</h1>
            <h1 className={styles.trackInfoLabels}>Album</h1>
            <h1 className={styles.trackAlbum}>{props.trackData.album.name}</h1>
            <h1 className={styles.trackInfoLabels}>Artists</h1>
            <div className={styles.trackArtistsContainer}>
              {props.trackData.artists.map((artist, index) => (
                <h1 key={index} className={styles.trackArtists}>
                  {artist.name}
                </h1>
              ))}
            </div>
            <div className={styles.trackPlayerContainer}>
              {props.trackData.preview_url === null && (
                <h1 className={styles.trackPreviewError}>No Preview Exists</h1>
              )}
              {props.trackData.preview_url !== null && (
                <TrackPlayer trackURL={props.trackData.preview_url} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.trackCarouselContainer}>
        <TrackCarousel trackList={props.artistTopTracks} />
      </div>
    </div>
  );
};

export default TrackInspect;
