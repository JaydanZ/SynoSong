import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";
import SearchBox from "../components/SearchWords/SearchBox";

const Home: NextPage = () => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      key="home"
    >
      <div className={styles.homeContainer}>
        <SearchBox />
      </div>
    </motion.div>
  );
};

export default Home;
