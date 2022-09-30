import styles from "./Nav.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { IoPerson } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Divide as Hamburger } from "hamburger-react";

const Navbar = () => {
  const [isLoggedIn, setLoginState] = useState<boolean>(false);
  const [mobileNavState, setMobileNav] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);

  const navContainerClass = mobileNavState
    ? `${styles["active"]} ${styles.navContainer}`
    : styles.navContainer;

  const itemsContainerClass = mobileNavState
    ? `${styles["active"]} ${styles.navItemsContainer}`
    : styles.navItemsContainer;

  const { data: session, status } = useSession();

  const closeNav = () => {
    setMobileNav(false);
    setOpen(false);
  };

  const signOutHandler = () => {
    if (isOpen === true) {
      setOpen(false);
      setMobileNav(false);
    }
    signOut();
  };

  const toggleMobileNav = (toggled: any) => {
    if (toggled) {
      // open nav menu
      setMobileNav(true);
    } else {
      // close nav menu
      setMobileNav(false);
    }
  };

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError" || session === null) {
      setLoginState(false);
    } else {
      setLoginState(true);
    }
  }, [session]);

  return (
    <nav className={navContainerClass}>
      <div className={styles.navLogoContainer}>
        <Link href="/">
          <h1 className={styles.navLogo}>Synosong</h1>
        </Link>
      </div>
      <div className={itemsContainerClass}>
        <div className={styles.navLinksContainer}>
          <Link href="/">
            <h1 className={styles.navLinks} onClick={closeNav}>
              Home
            </h1>
          </Link>
          <Link href="/my-playlist">
            <h1 className={styles.navLinks} onClick={closeNav}>
              My Playlist
            </h1>
          </Link>
          <h1 className={styles.navLinks} onClick={closeNav}>
            About
          </h1>
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
              <button onClick={closeNav} className={styles.loginBtn}>
                Log Into Spotify
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className={styles.mobileNavBtn}>
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          onToggle={toggleMobileNav}
          size={30}
          color={"white"}
        />
      </div>
    </nav>
  );
};

export default Navbar;
