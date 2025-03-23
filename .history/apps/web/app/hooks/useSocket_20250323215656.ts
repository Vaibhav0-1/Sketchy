import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzN2U4MmRlNy05MDA4LTRiMmUtYjEyZS00ODY5MzE5ODg4NGEiLCJpYXQiOjE3NDI1NzkzMDV9.nLf7SstN7TfL3FHZBroD4eLmVxra7EvZl3ekdb_SN0I`);
        ws.onopen = ()=>{
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }
}