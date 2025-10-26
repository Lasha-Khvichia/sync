
import { Message } from "@/app/types/message.type";
import styles from "../MessagerItem/MessagerItem.module.scss";
import React from "react";

interface MessagerItemProps {
  message: Message;
}

export const MessagerItem: React.FC<MessagerItemProps> = ({ message }) => {
  const isMyMessage = message.sender === 'me';

  return (
    <div
      className={`${styles.messageItem} ${
        isMyMessage ? styles.myMessage : styles.otherMessage
      }`}
    >
      <div className={styles.messagerItemContent}>
        <div className={styles.messagerItemContentAvatar}>
          <img src="/avatar.png" alt="avatar" className={styles.avatarImg} />
        </div>
        <div className={styles.messagerItemContentText}>
          <p> {typeof message === "string" ? message : ""}</p>
        </div>
      </div>
    </div>
  );
};
