import axios from "axios";
import { BACKEND_URL } from "../../config";

async function getRoom(slug: string){
    axios.get(`$`)
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