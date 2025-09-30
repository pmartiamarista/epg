import React, { useEffect, useState } from "react";

import type { ScrollPosition } from "@/types/common.types";

type UseScrollPositionState = ScrollPosition;

/**
 * Hook that provides access to the scroll position of a container
 *
 * This hook returns the scroll position of a container as an object with the
 * scrollLeft and containerWidth properties. It's useful for components that need
 * to react to or display the scroll position of a container.
 *
 *
 * @returns {ScrollPosition} The scroll position of a container as an object with the
 * scrollLeft and containerWidth properties.
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { scrollLeft, containerWidth } = useScrollPosition(containerRef);
 *   return <div>{scrollLeft} {containerWidth}</div>;
 * };
 * ```
 */
export const useScrollPosition = (
  containerRef: React.RefObject<HTMLDivElement | null>
) => {
  const [scrollPosition, setScrollPosition] = useState<UseScrollPositionState>({
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
