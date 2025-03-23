import axios from "axios";
import { BACKEND_URL } from "../../config";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ChatComponent from './ChatComponent';

async function getRoomId(slug: string) {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
        redirect('/auth/signin');
    }

    try {
        const response = await axios.get(`${BACKEND_URL}/room/${slug}`, {
            headers: {
                Authorization: `Bearer ${token.value}`
            }
        });
        return response.data.id;
    } catch (error) {
        console.error('Failed to fetch room:', error);
        redirect('/auth/signin');
    }
}

export default async function ChatRoom({
    params
}: {
    params: {
        slug: string
    }
}) {
    const slug = params.slug;
    const roomId = await getRoomId(slug);

    return (
        <div>
            <ChatComponent roomId={roomId} />
        </div>
    );
}