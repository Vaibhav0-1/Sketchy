import { Canvas } from "@/components/Canvas";

export default async function CanvasP   ({ params } : {
    params: {
        roomId: string
    }
})  {
    const roomId = (await params).roomId;

    return <Canvas roomId={roomId} />
}