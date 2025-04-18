"use client"
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";



export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();


  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw"

    }}>
      <input style={{
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        marginBottom: "10px"
      }} value = {roomId} onChange={(e) => {
        setRoomId(e.target.value);
      }} type="text" placeholder="Room Id" />

      <button style = {{
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        backgroundColor: "#0070f3",
        color: "white",
        cursor: "pointer"
      }}onClick={() => {
        router.push(`/room/${roomId}`);
      }}>Join Room</button>
      
    </div>
  );
}
