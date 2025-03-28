"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

interface ChatComponentProps {
    roomId: number;
}

export default function ChatComponent({ roomId }: ChatComponentProps) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = getCookie('token');
        if (!token) {
            router.push('/auth/signin');
            return;
        }

        // Connect to WebSocket with auth token
        const ws = new WebSocket(`ws://localhost:8080?token=${token}`);

        ws.onopen = () => {
            console.log('Connected to WebSocket');
            // Join the room
            ws.send(JSON.stringify({
                type: 'join_room',
                roomId: roomId
            }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'chat') {
                setMessages(prev => [...prev, data.message]);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            router.push('/auth/signin');
        };

        return () => {
            ws.close();
        };
    }, [roomId, router]);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        const token = getCookie('token');
        if (!token || !inputMessage.trim()) return;

        fetch(`${BACKEND_URL}/chat`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: inputMessage,
                roomId: roomId
            })
        });

        setInputMessage('');
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        {msg}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="p-4 border-t">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Type a message..."
                />
            </form>
        </div>
    );
}