import styles from "../MessagerItem/MessagerItem.module.scss";

export default function MessagerItem() {
    return (
        <div className={styles.messagerItem}>

            <div className={styles.messagerItemContent}>
                <div className={styles.messagerItemContentAvatar}>
                    <img src="/avatar.png" alt="avatar" className={styles.avatarImg} />
                </div>
                <div className={styles.messagerItemContentText}>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum quibusdam quae autem quidem aliquam facere.</p>
                </div>
            </div>

        </div>
    )
}