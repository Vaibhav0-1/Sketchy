import axios from "axios";
import { BACKEND_URL } from "../../config";

async function getRoomId(slug: string){
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
    return (await response).data.id;
}

export default async function ChatRoom({
    params
}: {
    params: {
        slug: string
    }
}) {
    const slug = (await params).slug;
    const roomId = await getRoomId(slug);
    return <ChatRoom id = 

}