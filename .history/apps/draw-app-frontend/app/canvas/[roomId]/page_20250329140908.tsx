import { RoomCanvas } from "@/components/RoomCanvas";

export default async function CanvasPage({ params } : {
    params: {
        roomId: string
    }
})  {
    const roomId = (await params).roomId;
    //it simply extracts the roomId
    

    return <RoomCanvas roomId={roomId} />
    //renders a roomcanvas compon
}