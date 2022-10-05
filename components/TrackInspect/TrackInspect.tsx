import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { add, remove, selectPlaylist } from "../../Store/playlistSlice";
import SpotifyPlayer from "react-spotify-web-playback";
import TrackPlayer from "../TrackPlayer/TrackPlayer";
import TrackCarousel from "../TrackCarousel/TrackCarousel";
import { toast } from "react-toastify";
import { BsArrowLeftShort } from "react-icons/bs";
import styles from "./TrackInspect.module.css";

const TrackInspect: React.FC<{
  trackData: SpotifyApi.TrackObjectFull;
  imgPalette: number[];
  artistTopTracks: SpotifyApi.TrackObjectFull[] | undefined;
}> = (props) => {
  const [isSessionValid, setSession] = useState<boolean>(false);

  const curPlaylist = useSelector(selectPlaylist);
  const dispatch = useDispatch();

  // Refs
  let containerRef = useRef<HTMLDivElement>(null);

  // Grab current session
  const { data: session } = useSession();

  const generateGradient = () => {
    containerRef.current!.style.setProperty(
      "--background-clr",
      `${props.imgPalette[0]},${props.imgPalette[1]},${props.imgPalette[2]}`
    );
  };

  const addToPlaylist = () => {
    dispatch(
      add({
        name: props.trackData.name,
        album: props.trackData.album.name,
        albumCover: props.trackData.album.images[0].url,
        artists: props.trackData.artists,
        id: props.trackData.id,
        uri: props.trackData.uri,
      })
    );

    toast.success("Track added!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const removeFromPlaylist = () => {
    dispatch(remove(props.trackData.id));
    toast.error("Track removed.", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    if (session) {
      setSession(true);
    } else {
      setSession(false);
    }
  }, [session]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.trackContainer}>
        <Link href="/">
          <a className={styles.returnBtn}>
            <BsArrowLeftShort />
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
              {isSessionValid === true && (
                <SpotifyPlayer
                  token={session!.user.accessToken}
                  uris={[props.trackData.uri]}
                  styles={{
                    bgColor: "#0b0b0b",
                    color: "#ffffff",
                    sliderHandleColor: "#ffffff",
                    trackNameColor: "#ffffff",
                    sliderColor: "#4800bb",
                    trackArtistColor: "#bfbfbf",
                  }}
                />
              )}
              {props.trackData.preview_url === null &&
                isSessionValid === false && (
                  <h1 className={styles.trackPreviewError}>
                    No Preview Exists
                  </h1>
                )}
              {props.trackData.preview_url !== null &&
                isSessionValid === false && (
                  <TrackPlayer trackURL={props.trackData.preview_url} />
                )}
            </div>
          </div>
        </div>
        {curPlaylist !== undefined &&
        curPlaylist.length !== 0 &&
        curPlaylist?.filter((track) => track.id === props.trackData.id)
          .length !== 0 ? (
          <button
            className={styles.toggleFromPlaylistBtn}
            onClick={removeFromPlaylist}
          >
            Remove From Playlist
          </button>
        ) : (
          <button
            className={styles.toggleFromPlaylistBtn}
            onClick={addToPlaylist}
          >
            Add To Playlist
          </button>
        )}
      </div>
      <div className={styles.trackCarouselContainer}>
        <TrackCarousel trackList={props.artistTopTracks} />
      </div>
    </div>
  );
};

export default TrackInspect;
