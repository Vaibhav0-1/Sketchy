"use client"

import { WS_URL } from "@/config";
import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}: {roomId: string}){
    //creates a socket connection to our ws server
     const [ socket, setSocket ] = useState<WebSocket | null>(null);
     const [error, setError] = useState<string | null>(null);


        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found');
                return;
            }
            const ws = new WebSocket(`${WS_URL}?token${token}`)

            ws.onopen = () => {
                setSocket(ws);
                ws.send(JSON.stringify({
                    type: "join_room",
                    roomId
                }))
            }
        },[])

        
        if(!socket){
            return <div>
                Connecting to server...
            </div>
        }

        return <div>
            <Canvas roomId = {roomId}/>
        </div>


}
