import Link from "next/link";
import styles from "./Navigation.module.scss";
export default function Navigation() {
  return (
    <section className={styles.navigationWrapper}>
      <div className={styles.navigationContent}>
        <div className={styles.navigationHeader}>
          <div className={styles.logo}>
            <img src="/logo.svg" alt="logo" className={styles.logoImage} />
          </div>

          <nav className={styles.navigationMenu}>
            <ul className={styles.navigationMenuList}>
              <li className={styles.navigationMenuItem}>
                <img src="/icons/message.svg" alt="chat" />
                <Link href="/">Chat</Link>
              </li>
              <li className={styles.navigationMenuItem}>
                <img src="/icons/people.svg" alt="people" />
                <Link href="/">People</Link>
              </li>
              <li className={styles.navigationMenuItem}>
                <img src="/icons/shop.svg" alt="shop" />
                <Link href="/">Shop</Link>
              </li>
              <li className={styles.navigationMenuItem}>
                <img src="/icons/rueqvest.svg" alt="request" />
                <Link href="/">Request</Link>
              </li>
              <li className={styles.navigationMenuItem}>
                <img src="/icons/archive.svg" alt="archive" />
                <Link href="/">Archive</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.navigationFooter}>
          <ul className={styles.navigationMenuList}>
            <li className={styles.navigationMenuItem}>
              <img src="/icons/logout.svg" alt="logout" />
              <Link href="/">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
