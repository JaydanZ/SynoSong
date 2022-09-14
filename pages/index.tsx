import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import SearchBox from "../components/SearchWords/SearchBox";

const Home: NextPage = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeContainerHeader}>SynoSong</h1>
      <h2 className={styles.homeContainerSubHeader}>
        Discover new music using <span>Synonyms.</span>
      </h2>
      <SearchBox />
    </div>
  );
};

export default Home;
