import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import styles from "./TrackPlayer.module.css";

const TrackPlayer: React.FC<{ trackURL: string | undefined }> = (props) => {
  // State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  // Refs
  const audioPlayer = useRef<HTMLMediaElement>(null);
  const progressBar = useRef<HTMLInputElement>(null);
  const animationProgress = useRef<number>(0);

  const onLoadedMetadata = () => {
    const seconds = Math.floor(audioPlayer.current!.duration);
    setDuration(seconds);

    progressBar.current!.max = seconds.toString();
  };

  const calcTime = (secs: number) => {
    const minutes: number = Math.floor(secs / 60);
    const returnedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds: number = Math.floor(secs % 60);
    const returnedSeconds: string = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const playPauseHandler = () => {
    const prevPlayState: boolean = isPlaying;
    setIsPlaying(!prevPlayState);

    if (!prevPlayState) {
      audioPlayer.current?.play();
      animationProgress.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current?.pause();
      cancelAnimationFrame(animationProgress.current); //
    }
  };

  const changePlayerCurTime = () => {
    progressBar.current!.style.setProperty(
      "--seek-before-width",
      `${(parseInt(progressBar.current!.value) / duration) * 100}%`
    );

    setCurrentTime(parseInt(progressBar.current!.value));
  };

  const whilePlaying = () => {
    progressBar.current!.value = audioPlayer.current!.currentTime.toString();
    changePlayerCurTime();
    animationProgress.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current!.currentTime = parseInt(progressBar.current!.value);
    changePlayerCurTime();
  };

  return (
    <div className={styles.trackPlayer}>
      <audio
        ref={audioPlayer}
        src={props.trackURL}
        preload="metadata"
        onLoadedMetadata={onLoadedMetadata}
      ></audio>
      <button className={styles.playerPlayPause} onClick={playPauseHandler}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <div className={styles.currentTime}>{calcTime(currentTime)}</div>
      <input
        ref={progressBar}
        type="range"
        className={styles.progressBar}
        defaultValue="0"
        onChange={changeRange}
      />
      <div className={styles.duration}>
        {duration && !isNaN(duration) && calcTime(duration)}
      </div>
    </div>
  );
};

export default TrackPlayer;
