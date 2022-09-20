import React, { useCallback } from "react";
import TrackItem from "../Tracks/TrackItem";
import styles from "./TrackCarousel.module.css";
import useEmblaCarousel from "embla-carousel-react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const TrackCarousel: React.FC<{
  trackList: SpotifyApi.TrackObjectFull[] | undefined;
}> = (props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={styles.embla}>
      <h1 className={styles.topTracksLabel}>Top Tracks from Artist</h1>
      <div className={styles.emblaViewport} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {props.trackList !== undefined &&
            props.trackList.map((track, index) => (
              <div className={styles.emblaSlide} key={index}>
                <TrackItem
                  trackName={track.name}
                  trackArtists={track.artists}
                  trackAlbumName={track.album.name}
                  trackAlbumImage={track.album.images[0].url}
                  trackID={track.id}
                />
              </div>
            ))}
        </div>
      </div>
      <button className={styles.emblaPrev} onClick={scrollPrev}>
        <FaArrowAltCircleLeft />
      </button>
      <button className={styles.emblaNext} onClick={scrollNext}>
        <FaArrowAltCircleRight />
      </button>
    </div>
  );
};

export default TrackCarousel;
