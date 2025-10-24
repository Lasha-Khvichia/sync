import Navigation from "../components/Navigation/Navigation";
import styles from "./page.module.scss";

export default function Home() {
  return  (
    <div className={styles.everythingWrapper}>
        <div className={styles.content}>
           <Navigation/>
        </div>
    </div>
  )
}
