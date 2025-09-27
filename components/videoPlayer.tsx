"use client";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  playlistUrl: string;
  watermarkText: string;
}

export default function VideoPlayer({ playlistUrl, watermarkText }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // Initialize Video.js player
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      preload: "auto",
      fluid: true,
      sources: [{ src: playlistUrl, type: "application/x-mpegURL" }],
    });

    // Remove old watermark if exists
    if (watermarkRef.current) {
      watermarkRef.current.remove();
    }

    // Create animated watermark
    const watermarkDiv = document.createElement("div");
    watermarkDiv.innerText = watermarkText;
    watermarkDiv.style.position = "absolute";
    watermarkDiv.style.top = "10px";
    watermarkDiv.style.right = "10px";
    watermarkDiv.style.color = "white";
    watermarkDiv.style.opacity = "0.7";
    watermarkDiv.style.fontSize = "14px";
    watermarkDiv.style.pointerEvents = "none";
    player.el().appendChild(watermarkDiv);
    watermarkRef.current = watermarkDiv;

    // Animate watermark
    let angle = 0;
    const animate = () => {
      if (!watermarkRef.current) return;
      watermarkRef.current.style.top = `${10 + Math.sin(angle) * 5}px`;
      watermarkRef.current.style.right = `${10 + Math.cos(angle) * 5}px`;
      angle += 0.05;
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      player.dispose();
      watermarkRef.current = null;
    };
  }, [playlistUrl, watermarkText]);

  return <video ref={videoRef} className="video-js vjs-big-play-centered" />;
}
