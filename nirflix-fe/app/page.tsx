// app/page.tsx or pages/index.tsx
'use client'; // Only needed if using App Router and interactive components

import { useRouter } from 'next/navigation';
export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-black text-white px-4 text-center">
      <h1 className="text-5xl font-bold mb-4">🎬 NiroFlix</h1>
      <p className="text-lg max-w-xl mb-6">
        Your private streaming space. Invite-only, just for you and your friends. Unlimited movies. Zero distractions.
      </p>
      <button
        onClick={() => router.push('/login')}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition flex items-center gap-2"
      >
        Enter NiroFlix
      </button>
    </main>
  );
}
