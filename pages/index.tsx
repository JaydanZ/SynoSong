import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import SearchBox from "../components/SearchWords/SearchBox";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>SynoSong</h1>
      <h2>Discover new music using synonyms</h2>
      <SearchBox />
    </div>
  );
};

export default Home;
