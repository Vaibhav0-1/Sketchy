import { useRef, useState, useEffect, RefObject } from "react";
import ResizeObserver from "resize-observer-polyfill";

interface Dimensions {
  width: number;
  height: number;
}

const initialState: Dimensions = { width: 0, height: 0 };

// TypeScript-compatible useDimension hook
const useDimension = (ref: RefObject<HTMLElement | null>) => {
  const [dimensions, setDimensions] = useState<Dimensions>(initialState);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    resizeObserverRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserverRef.current.observe(ref.current);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null; // Reset the ref
      }
    };
  }, [ref]);

  return dimensions;
};

export default useDimension;
