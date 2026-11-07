"use client";

import { ComponentProps, useEffect, useRef } from "react";

export default function AutoPlayVideo(props: ComponentProps<"video">) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => {
      if (document.visibilityState === "visible") void video.play().catch(() => {});
    };
    video.muted = true;
    play();
    video.addEventListener("canplay", play);
    document.addEventListener("visibilitychange", play);
    document.addEventListener("pointerdown", play);
    document.addEventListener("keydown", play);
    return () => {
      video.removeEventListener("canplay", play);
      document.removeEventListener("visibilitychange", play);
      document.removeEventListener("pointerdown", play);
      document.removeEventListener("keydown", play);
    };
  }, []);
  return <video {...props} ref={videoRef} autoPlay muted loop playsInline />;
}
