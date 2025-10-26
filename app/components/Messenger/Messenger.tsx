"use client";
import { useEffect, useRef, useState } from "react";

import styles from "./Messenger.module.scss";
import { Send } from "lucide-react";
import { MessagerItem } from "./MessagerItem/MessagerItem";
import { useWebSocket } from "@/app/hooks/useWebSocket";
import { ConnectionStatus } from "@/app/types/message.type";

const WS_URL = "ws://localhost:3001";

export default function Messenger() {
  const [showVoceSec, setShowVoceSec] = useState(false);
  const [time, setTime] = useState(0);
  let interval: NodeJS.Timeout;
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize username only on client side to avoid hydration mismatch
  useEffect(() => {
    setUsername("User_" + Math.floor(Math.random() * 1000));
  }, []);

  const {
    messages,
    sendMessage,
    connectionStatus,
    isConnected,
    disconnect,
    reconnect,
  } = useWebSocket({
    url: WS_URL,
    onMessage: (message) => {
      console.log("ახალი შეტყობინება მივიდა");
    },
  });

  // ავტომატური scroll ყველაზე ბოლო მესიჯამდე
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // მესიჯის გაგზავნის ფუნქცია
  const handleSendMessage = () => {
    const text = inputValue.trim();

    if (text && isConnected) {
      const success = sendMessage(text, username);

      if (success) {
        setInputValue(""); // ვასუფთავებთ input-ს
      } else {
        alert("მესიჯის გაგზავნა ვერ მოხერხდა. კავშირი არ არის დამყარებული.");
      }
    }
  };

  // Enter-ზე გაგზავნა
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  // სტატუსის ფერის განსაზღვრა
  const getStatusColor = () => {
    switch (connectionStatus) {
      case ConnectionStatus.CONNECTED:
        return "#28a745";
      case ConnectionStatus.CONNECTING:
        return "#ffc107";
      case ConnectionStatus.ERROR:
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };
  // სტატუსის ტექსტი
  const getStatusText = () => {
    switch (connectionStatus) {
      case ConnectionStatus.CONNECTED:
        return "✅ დაკავშირებულია";
      case ConnectionStatus.CONNECTING:
        return "🔄 დაკავშირება...";
      case ConnectionStatus.ERROR:
        return "❌ კავშირის შეცდომა";
      default:
        return "⚪ გათიშულია";
    }
  };

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
  }, [time, showVoceSec]);

  return (
    <section className={styles.messengerWrapper}>
      <div className={styles.messengerHeader}>
        <div className={styles.messengerAvatar}>
          <div className={styles.avatarImage}>
            <img src="/avatar.png" alt="avatar" className={styles.AvatarImg} />
          </div>
          <div className={styles.messengerName}>
            <h1>{username || "User"}</h1>
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
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            💬 მესიჯები ჯერ არ არის. დაიწყე საუბარი!
          </div>
        ) : (
          messages.map((message) => (
            <MessagerItem key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            // disabled={!isConnected}
            placeholder="Type a message"
            className={styles.input}
          />
        </div>

        <div className={styles.lasticons}>
          <button
            className={styles.sendbtn}
            onClick={handleHideVoceSec}
            disabled={!isConnected || !inputValue.trim()}
          >
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
};
