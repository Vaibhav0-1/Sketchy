"use client";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "/../config";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/signup`, {
                username: email,
                password,
                name
            });
            router.push('/auth/signin');
        } catch (error) {
            console.error('Signup failed:', error);
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <form onSubmit={handleSignup} className="space-y-4 w-96">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}