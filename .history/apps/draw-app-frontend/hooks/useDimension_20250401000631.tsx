import { useState, useCallback, useLayoutEffect } from "react";

interface DimensionObject {
  width: number;
  height: number;
  top: number;
  left: number;
  x: number;
  y: number;
  right: number;
  bottom: number;
}

interface UseDimensionsArgs {
  liveMeasure?: boolean;
}

type UseDimensionsHook = [
  (node: HTMLElement | null) => void,
  DimensionObject | {},
  HTMLElement | null
];

function getDimensionObject(node: HTMLElement): DimensionObject {
  const rect = node.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    x: rect.x || rect.left,
    y: rect.y || rect.top,
    right: rect.right,
    bottom: rect.bottom,
  };
}

export default function useDimensions({ liveMeasure = true }: UseDimensionsArgs = {}): UseDimensionsHook {
  const [dimensions, setDimensions] = useState<DimensionObject | {}>({});
  const [node, setNode] = useState<HTMLElement | null>(null);

  const ref = useCallback((node: HTMLElement | null) => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () => {
        window.requestAnimationFrame(() => setDimensions(getDimensionObject(node)));
      };

      measure();

      if (liveMeasure) {
        window.addEventListener("resize", measure);
        window.addEventListener("scroll", measure);

        return () => {
          window.removeEventListener("resize", measure);
          window.removeEventListener("scroll", measure);
        };
      }
    }
  }, [node, liveMeasure]);

  return [ref, dimensions, node];
}
