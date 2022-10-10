import { NextPage } from "next";
import type { GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import { Providers } from "../../types/next-auth-custom";
import { motion } from "framer-motion";
import styles from "./login.module.css";

const login: NextPage<{ providers: Providers }> = ({ providers }) => {
  return (
    <motion.div
      className={styles.container}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      key="login"
    >
      <div className={styles.loginContainer}>
        <h1 className={styles.loginHeader}>Login</h1>
        <div className={styles.loginSubHeader}>
          Login with your Spotify account to access these features:
        </div>
        <ul className={styles.loginFeatures}>
          <li className={styles.loginFeaturesItems}>
            Listen to full length tracks instead of previews
          </li>
          <li className={styles.loginFeaturesItems}>
            Create your own custom playlist and import it into Spotify
          </li>
        </ul>

        {Object.values(providers).map((provider, index) => (
          <button
            className={styles.loginBtn}
            key={index}
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with Spotify
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default login;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
