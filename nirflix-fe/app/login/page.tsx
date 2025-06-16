"use client"
import { useRouter } from 'next/navigation';
// pages/login.tsx
import { useState } from 'react';
import { nixios } from '../lib/ApiClient';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
const router=useRouter();
  const handleLogin =async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    const res=nixios.post("/api/auth/login" ,{
        "username":"Niranjan",
        password:"12345"
      })
    if((await res).ok){
      router.push("/dashboard")
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-900 text-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-600">Niroflix Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded text-white font-semibold transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
