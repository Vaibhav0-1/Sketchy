"use client";
import { useEffect, useRef } from "react"
import { initDraw } from "@/draw"

export default async function Canvas({ params } : {
    params: {
        roomId: string
    }
})  {
    const roomId = (await params).roomId;

}