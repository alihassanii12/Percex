'use client';

import { useEffect, useRef, useState } from 'react';

export default function LottieAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Dynamically import @lottiefiles/dotlottie-web
    import('@lottiefiles/dotlottie-web').then(({ DotLottie }) => {
      if (containerRef.current) {
        const canvas = containerRef.current.querySelector('canvas');
        if (canvas) {
          const dotLottie = new DotLottie({
            canvas,
            src: '/Gears Lottie Animation.lottie',
            loop: true,
            autoplay: true,
          });

          return () => {
            dotLottie.destroy();
          };
        }
      }
    });
  }, [isMounted]);

  // Don't render canvas until mounted on client
  if (!isMounted) {
    return <div className="mx-auto mb-8 h-[200px] w-[200px]" />;
  }

  return (
    <div ref={containerRef} className="mx-auto mb-8 h-[200px] w-[200px]">
      <canvas style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
