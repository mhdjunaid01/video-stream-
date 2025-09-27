"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSignedUrl } from "@/lib/getSignedUrl";

type VideoCardProps = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
};

export default function VideoCard({ id, title, description, thumbnailUrl }: VideoCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleWatchClick = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);

    try {
      const signedUrl = await getSignedUrl(id);

      if (!signedUrl) {
        setError("HLS not ready. Please try again later.");
        setLoading(false);
        return;
      }

      router.push(`/watch/${id}?url=${encodeURIComponent(signedUrl)}`);
    } catch (err: any) {
      console.error("Failed to get signed URL:", err);
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-sm hover:shadow-lg transition-shadow duration-200">
      {thumbnailUrl && (
        <div className="relative w-full h-48">
          <Image src={thumbnailUrl} alt={title} fill className="object-cover rounded-t-md" />
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </CardHeader>
      <CardFooter>
        <Button className="w-full" onClick={handleWatchClick} disabled={loading}>
          {loading ? "Loading..." : "Watch"}
        </Button>
      </CardFooter>
    </Card>
  );
}
