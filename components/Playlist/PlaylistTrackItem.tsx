import Image from "next/image";
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";
import styles from "./PlaylistTrackItem.module.css";

const PlaylistTrackItem: React.FC<{
  id: string;
  name: string;
  album: string;
  albumCover: string;
  artists: SpotifyApi.ArtistObjectSimplified[];
  onRemoveTrack: (id: string) => void;
}> = (props) => {
  const router = useRouter();

  const trackClickHandler = () => {
    router.push(`/track-inspect/${props.id}`);
  };

  const removeTrack = () => {
    props.onRemoveTrack(props.id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={props.albumCover}
          alt={props.name}
          width="40px"
          height="40px"
        />
      </div>

      <div className={styles.nameAlbumContainer}>
        <h1 className={styles.name} onClick={trackClickHandler}>
          {props.name}
        </h1>
        <h1 className={styles.album}>{props.album}</h1>
      </div>
      <button className={styles.removeTrackBtn} onClick={removeTrack}>
        <IoClose />
      </button>
    </div>
  );
};

export default PlaylistTrackItem;
