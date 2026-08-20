'use client';

import React from 'react';

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  autoPlay = false,
  controls = true,
  playsInline = true,
  className = '',
}) => {
  return (
    <div className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 ${className}`}>
      <video
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        controls={controls}
        playsInline={playsInline}
        preload="metadata"
        className="w-full h-full object-cover"
      />
    </div>
  );
};
