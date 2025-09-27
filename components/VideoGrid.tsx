
"use client";
import VideoCard from "./videoCard";

export default function VideoGrid({ videos }: { videos: typeof import("@/lib/videos").videos }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          id={video.id}
          title={video.title}
          description={video.description}
          thumbnailUrl={video.thumbnail}
        />
      ))}
    </div>
  );
}
