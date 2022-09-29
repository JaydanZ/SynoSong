import styles from "./Nav.module.css";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { IoPerson } from "react-icons/io5";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setLoginState] = useState<boolean>(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError" || session === null) {
      setLoginState(false);
    } else {
      setLoginState(true);
    }
  }, [session]);

  return (
    <nav className={styles.navContainer}>
      <div className={styles.navItemsContainer}>
        <div className={styles.navLogoContainer}>
          <Link href="/">
            <h1 className={styles.navLogo}>Synosong</h1>
          </Link>
        </div>
        <div className={styles.navLinksContainer}>
          <Link href="/">
            <h1 className={styles.navLinks}>Home</h1>
          </Link>
          <Link href="/my-playlist">
            <h1 className={styles.navLinks}>My Playlist</h1>
          </Link>
          <h1 className={styles.navLinks}>About</h1>
        </div>
        <div className={styles.authLinks}>
          {isLoggedIn === true && (
            <div className={styles.navLoginState}>
              <IoPerson className={styles.navProfileIcon} />
              <h1 className={styles.navUsername}>{session?.user?.name}</h1>
              <button className={styles.loginBtn} onClick={() => signOut()}>
                Log Out
              </button>
            </div>
          )}

          {isLoggedIn === false && (
            <Link href="/login">
              <button className={styles.loginBtn}>Log Into Spotify</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
