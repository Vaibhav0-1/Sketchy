"use-client"
import { useState } from "react";
import styles from "./page.module.css";



export default function Home() {
  const [roomId, setRoomId] = useState("");
  return (
    <div className={styles.page}>
      <input value = {roomId} onChange
      
    </div>
  );
}
