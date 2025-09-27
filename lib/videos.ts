
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  fileName: string;
}

export const videos: Video[] = [
  { id: "1", title: "Catch fish with a net", description: "This video about fishing", thumbnail: "/image.png", fileName: "sample-30s.mp4" },
  { id: "4", title: "Timer", description: "count", thumbnail: "/image1.png", fileName: "playlist.mp4" },
];
