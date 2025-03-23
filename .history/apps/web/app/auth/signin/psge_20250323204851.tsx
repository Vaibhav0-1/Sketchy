"use client";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function handleSignin(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/signin`, {
                username: email,
                password
            });
            
            // Store the token in localStorage
            localStorage.setItem('token', response.data.token);
            
            // Redirect to home page
            router.push('/');
        } catch (error) {
            console.error('Signin failed:', error);
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <form onSubmit={handleSignin} className="space-y-4 w-96">
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
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}