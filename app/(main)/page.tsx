import Buttons from "../components/Buttons/Buttons";
import Navigation from "../components/Navigation/Navigation";
import SideBar from "../components/SideBar/SideBar";
import styles from "./page.module.scss";

export default function Home() {
  return  (
    <div className={styles.everythingWrapper}>
        <div className={styles.content}>
           <Navigation/>
           <SideBar/>
        </div>
    </div>
  )
}
