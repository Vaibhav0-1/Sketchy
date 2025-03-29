"use client"

import { WS_URL } from "@/config";
import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}: {roomId: string}){
    //creates a socket connection to our ws server
     const [ socket, setSocket ] = useState<WebSocket | null>(null);

        useEffect(() => {
            const ws = new WebSocket(`${WS_URL}?token${eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYWY1NWM2Ny1jNWYzLTQ2MjUtOGM5OS02ZTM3OTUyZWQ4MDYiLCJpYXQiOjE3NDMyNDU0NzJ9.vFyoJx9RWT1lvkYfQwILNivPNLb3L28aG2wt9NNy2FA}`)

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
