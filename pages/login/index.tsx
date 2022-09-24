import { NextPage } from "next";
import type { GetServerSideProps } from "next";
import styles from "./login.module.css";
import { getProviders, signIn } from "next-auth/react";
import { Providers } from "../../types/next-auth-custom";

const login: NextPage<{ providers: Providers }> = ({ providers }) => {
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h1 className={styles.loginHeader}>Login to access these features:</h1>
        <ul className={styles.loginFeatures}>
          <li>Listen to full length tracks instead of previews</li>
          <li>Create your own custom playlist and import it into Spotify</li>
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
    </div>
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
