import axios from "axios";
import { BACKEND_URL } from "../../config";



export default function ChatRoom({
    params
}: {
    params: {
        slug: string
    }
}) {
    const slug = params.slug;
}