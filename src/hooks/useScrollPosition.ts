import React, { useEffect, useState } from "react";

interface ScrollPosition {
  scrollLeft: number;
  containerWidth: number;
}

export const useScrollPosition = (
  containerRef: React.RefObject<HTMLDivElement | null>
) => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollLeft: 0,
    containerWidth: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScrollPosition = () => {
      setScrollPosition({
        scrollLeft: container.scrollLeft,
        containerWidth: container.clientWidth,
      });
    };

    const handleResize = () => {
      setScrollPosition(prev => ({
        ...prev,
        containerWidth: container.clientWidth,
      }));
    };

    updateScrollPosition();

    container.addEventListener("scroll", updateScrollPosition);
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", updateScrollPosition);
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  return scrollPosition;
};
