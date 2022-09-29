import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import SearchBox from "../components/SearchWords/SearchBox";

const Home: NextPage = () => {
  return (
    <div className={styles.homeContainer}>
      <SearchBox />
    </div>
  );
};

export default Home;
