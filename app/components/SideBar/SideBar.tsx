import styles from "./SideBar.module.scss";

export default function SideBar() {
  return (
    <section className={styles.sideBarWrapper}>

      <div className={styles.sideBarContent}>

        <div className={styles.sideBarHeader}>

          <div className={styles.headline}>
            <h1 className={styles.headlineTitle}>Chat</h1>
            <div className={styles.headlineIcon}>
              <button className={styles.btn}>
                <img src="/icons/video.svg" alt="video" />
              </button>
              <button className={styles.btn}>
                <img src="/icons/add.svg" alt="add" />
              </button>
            </div>
          </div>

          <div className={styles.search}>
             <img src="/icons/messageSearch.svg" alt="search" className={styles.searchIcon} />
             <input type="text" placeholder="Search" className={styles.searchInput}/>
          </div>

        </div>


        <div className={styles.sideBarBody}>

           <div className={styles.messageBox}>
              <img src="/avatar.png" alt="message" className={styles.avatar}/>
              <div className= {styles.avatarInfo}>
                  <p className={styles.avatarName}>Rihanna Goldberg</p>
                  <span className={styles.avatarMessage}>there will be message</span>
              </div>
           </div>

           <div className={styles.messageBox}>
              <img src="/avatar.png" alt="message" className={styles.avatar}/>
              <div className= {styles.avatarInfo}>
                  <p className={styles.avatarName}>Rihanna Goldberg</p>
                  <span className={styles.avatarMessage}>there will be message</span>
              </div>
           </div>

           <div className={styles.messageBox}>
              <img src="/avatar.png" alt="message" className={styles.avatar}/>
              <div className= {styles.avatarInfo}>
                  <p className={styles.avatarName}>Rihanna Goldberg</p>
                  <span className={styles.avatarMessage}>there will be message</span>
              </div>
           </div>


        </div>


      </div>
    </section>
  );
}
