import styles from "./Nav.module.css";
import Link from "next/link";

const Navbar = () => {
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
      </div>
    </nav>
  );
};

export default Navbar;
