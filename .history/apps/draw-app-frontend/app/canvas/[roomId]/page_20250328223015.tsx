

export default async function Canvas({ params } : {
    params: {
        roomId: string
    }
})  {
    const roomId = (await params).roomId;

    return <Canvas roomId={roomId} />
}