import axios from "axios";

export const getSignedUrl = async (videoId: string) => {
  try {
    const response = await axios.post("/api/video/sign", { videoId });
    return response.data.url;
  } catch (err: any) {
    console.error("Failed to fetch signed URL:", err.response?.data || err.message);
    throw err;
  }
};
