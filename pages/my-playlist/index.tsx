import { NextPage } from "next";
import styles from "./MyPlaylist.module.css";
import Head from "next/head";
import Playlist from "../../components/Playlist/Playlist";
import { motion } from "framer-motion";

const MyPlaylistPage: NextPage = () => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      key="playlist"
    >
      <Head>
        <title>Synosong - My Playlist</title>
      </Head>
      <Playlist />
    </motion.div>
  );
};

export default MyPlaylistPage;
