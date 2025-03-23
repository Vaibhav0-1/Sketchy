import axios from "axios";
import { BACKEND_URL } from "../../config";

async function getRoom(slug: string){
    axios.get(`${A}`)
}

export default function ChatRoom({
    params
}: {
    params: {
        slug: string
    }
}) {
    const slug = params.slug;
}