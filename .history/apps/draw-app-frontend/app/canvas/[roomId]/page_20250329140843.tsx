import { RoomCanvas } from "@/components/RoomCanvas";

export default async function CanvasPage({ params } : {
    params: {
        roomId: string
    }
})  {
    const roomId = (await params).roomId;
    //it simply extracts
    

    return <RoomCanvas roomId={roomId} />
}