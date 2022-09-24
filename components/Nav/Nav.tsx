import styles from "./Nav.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { IoPerson } from "react-icons/io5";

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <nav className={styles.navContainer}>
      <div className={styles.navItemsContainer}>
        <div className={styles.navLogoContainer}>
          <Link href="/">
            <h1 className={styles.navLogo}>Synosong</h1>
          </Link>
        </div>
        <div className={styles.navLinksContainer}>
          <h1 className={styles.navLinks}>About</h1>
        </div>
        <div className={styles.authLinks}>
          {session !== null && (
            <div className={styles.navLoginState}>
              <IoPerson className={styles.navProfileIcon} />
              <h1 className={styles.navUsername}>{session?.user?.name}</h1>
              <button className={styles.loginBtn} onClick={() => signOut()}>
                Log Out
              </button>
            </div>
          )}

          {session === null && (
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
