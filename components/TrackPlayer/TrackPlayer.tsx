import { useState, useRef } from "react";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import styles from "./TrackPlayer.module.css";

const TrackPlayer: React.FC<{ trackURL: string | undefined }> = (props) => {
  // State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currentVolume, setCurrentVolume] = useState<number>(0);

  // Refs
  const audioPlayer = useRef<HTMLMediaElement>(null);
  const progressBar = useRef<HTMLInputElement>(null);
  const volumeBar = useRef<HTMLInputElement>(null);
  const animationProgress = useRef<number>(0);

  const onLoadedMetadata = () => {
    const seconds: number = Math.floor(audioPlayer.current!.duration);
    const volume: number = 50;

    setDuration(seconds);

    volumeBar.current!.value = volume.toString();
    progressBar.current!.max = seconds.toString();
    changeVolume();
  };

  const calcTime = (secs: number) => {
    const minutes: number = Math.floor(secs / 60);
    const returnedMinutes: string = minutes.toString(); //< 10 ? `0${minutes}` : `${minutes}`;
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
    if (audioPlayer.current !== null && progressBar.current !== null) {
      progressBar.current!.value = audioPlayer.current!.currentTime.toString();
      changePlayerCurTime();
      animationProgress.current = requestAnimationFrame(whilePlaying);
    }
  };

  const changeRange = () => {
    audioPlayer.current!.currentTime = parseInt(progressBar.current!.value);
    changePlayerCurTime();
  };

  const changeVolume = () => {
    if (!isMuted) {
      const curVolume: number = parseInt(volumeBar.current!.value) / 100;
      audioPlayer.current!.volume = curVolume;
      volumeBar.current!.style.setProperty(
        "--seek-before-width-volume",
        `${parseInt(volumeBar.current!.value)}%`
      );
    } else {
      volumeBar.current!.value = (0).toString();
      volumeBar.current!.style.setProperty(
        "--seek-before-width-volume",
        `${parseInt(volumeBar.current!.value)}%`
      );
    }
  };

  const volumeMuteHandler = () => {
    const prevMuteState: boolean = isMuted;
    setIsMuted(!prevMuteState);

    if (!prevMuteState) {
      const curVolume: number = parseInt(volumeBar.current!.value) / 100;
      setCurrentVolume(curVolume);

      audioPlayer.current!.muted = true;
      volumeBar.current!.value = (0).toString();
      volumeBar.current!.style.setProperty(
        "--seek-before-width-volume",
        `${parseInt(volumeBar.current!.value)}%`
      );
    } else {
      const prevVolume = currentVolume;
      audioPlayer.current!.muted = false;
      audioPlayer.current!.volume = prevVolume;

      volumeBar.current!.value = (prevVolume * 100).toString();
      volumeBar.current!.style.setProperty(
        "--seek-before-width-volume",
        `${parseInt(volumeBar.current!.value)}%`
      );
    }
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
        {duration !== 0 && !isNaN(duration) && calcTime(duration)}
      </div>
      <div className={styles.volumeControls}>
        <button className={styles.playerMute} onClick={volumeMuteHandler}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <input
          ref={volumeBar}
          type="range"
          className={styles.volumeBar}
          defaultValue="50"
          onChange={changeVolume}
        />
      </div>
    </div>
  );
};

export default TrackPlayer;
