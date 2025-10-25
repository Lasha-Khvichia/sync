"use client";
import { useEffect, useState } from "react";
import MessagerItem from "./MessagerItem/MessagerItem";
import styles from "./Messenger.module.scss";
import { Send } from "lucide-react";

export default function Messenger() {
  const [showVoceSec, setShowVoceSec] = useState(false);
  const [time, setTime] = useState(0);
  let interval: NodeJS.Timeout;;

  const handleShowVoceSec = () => {
    setShowVoceSec(true);
  };

  const handleHideVoceSec = () => {
    setShowVoceSec(false);
  };

  useEffect(() => {
    if (showVoceSec) {
      interval = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setTime(0);
    }
    return () => clearInterval(interval);
  }, [time, showVoceSec,]);

  return (
    <section className={styles.messengerWrapper}>
      <div className={styles.messengerHeader}>
        <div className={styles.messengerAvatar}>
          <div className={styles.avatarImage}>
            <img src="/avatar.png" alt="avatar" className={styles.AvatarImg} />
          </div>
          <div className={styles.messengerName}>
            <h1>Rihanna Goldberg</h1>
          </div>
        </div>
        <div className={styles.messengericons}>
          <button className={styles.btn}>
            <img src="/icons/phone.svg" alt="video" />
          </button>
          <button className={styles.btn}>
            <img src="/icons/video.svg" alt="video" />
          </button>
          <button className={styles.btn}>
            <img src="/icons/option.svg" alt="video" />
          </button>
        </div>
      </div>

      <div className={styles.messengerCenter}>
        <MessagerItem />
      </div>

      <div className={styles.messengerFooter}>
        <div className={styles.Footericons}>
          <button className={styles.btn}>
            <img
              src="/icons/slbum.svg"
              alt="video"
              className={styles.iconImg}
            />
          </button>
          <button className={styles.btn}>
            <img
              src="/icons/photo.svg"
              alt="video"
              className={styles.iconImg}
            />
          </button>

          <div className={styles.btn} onClick={handleShowVoceSec}>
            {showVoceSec ? (
              <div className={styles.voceSec}>
                <p>{time}</p>
              </div>
            ) : (
              <button className={styles.btn}>
                <img
                  src="/icons/voice.svg"
                  alt="video"
                  className={styles.iconImg}
                />
              </button>
            )}
          </div>
        </div>

        <div className={styles.messengerinput}>
          <input
            type="text"
            placeholder="Type a message"
            className={styles.input}
          />
        </div>

        <div className={styles.lasticons}>
          <button className={styles.sendbtn} onClick={handleHideVoceSec}>
            <Send />
          </button>
          <button className={styles.btn}>
            <img
              src="/icons/emoji.svg"
              alt="video"
              className={styles.iconImg}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
