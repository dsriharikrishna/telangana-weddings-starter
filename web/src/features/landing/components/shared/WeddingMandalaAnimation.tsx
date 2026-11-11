"use client";

import React, { useSyncExternalStore } from "react";
import { Lottie } from "lottie-react";

const emptySubscribe = () => () => {};

export function WeddingMandalaAnimation({ className = "w-24 h-24" }: { className?: string }) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isMounted) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="w-10 h-10 rounded-full border-2 border-[#C5A46D] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center select-none pointer-events-none ${className}`}>
      <Lottie
        src="/wedding/wedding-mandala-loader.json"
        autoplay
        loop
        className="w-full h-full"
      />
    </div>
  );
}
