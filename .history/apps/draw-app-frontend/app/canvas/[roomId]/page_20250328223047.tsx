import { Canvas } from "@/components/Canvas";

export default async function CanvasPAGE({ params } : {
    params: {
        roomId: string
    }
})  {
    const roomId = (await params).roomId;

    return <Canvas roomId={roomId} />
}