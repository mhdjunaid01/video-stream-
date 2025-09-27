
import VideoGrid from "@/components/VideoGrid";
import { videos } from "@/lib/videos";

export default function CatalogPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Video Catalog</h1>
      <VideoGrid videos={videos} />
    </main>
  );
}
