import { useRef, useState, useEffect, RefObject } from "react";
import ResizeObserver from "resize-observer-polyfill";

const initialState = { width: 0, height: 0 };

const useDimension = (ref: RefObject<HTMLElement | null>) => {
  const [dimensions, setDimensions] = useState(initialState);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    observerRef.current = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    observerRef.current.observe(ref.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [ref]);

  return dimensions;
};

export default useDimension;
