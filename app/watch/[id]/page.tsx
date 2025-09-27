
"use client";

import { useSearchParams } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import { useAuth } from "@/lib/AuthContext";

export default function WatchPage() {
  const params = useSearchParams();
  const url = params.get("url") || "";
  const { user } = useAuth();

  if (!user) return <p>Please login to watch videos.</p>;

  return (
    <div className="container mx-auto p-4">
      <VideoPlayer playlistUrl={url} watermarkText={user.email} />
    </div>
  );
}
