/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const Stream = ({ id }: { id: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    // Ensure we're on the client
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (!playerRef.current) {
      const player = videojs(videoElement, {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
          {
            src: `${process.env.NEXT_PUBLIC_API_URL}/api/movies/stream?id=${id}`,
            type: "video/mp4",
          },
        ],
      });

      playerRef.current = player;
      console.log(player.audioTracks());
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [isClient, id]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-default-skin" />
    </div>
  );
};

export default Stream;
