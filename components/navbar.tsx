
"use client";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between px-6 py-3 bg-gray-800 text-white">
      <Link href="/">VideoCatalog</Link>
      <div>
        {user ? (
          <>
            <span className="mr-4">{user.email}</span>
            <button onClick={logout} className="underline">Logout</button>
          </>
        ) : (
          <Link href="/auth">Login</Link>
        )}
      </div>
    </nav>
  );
}
