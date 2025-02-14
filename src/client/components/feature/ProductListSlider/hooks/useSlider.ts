import { useCallback, useRef, useState, useSyncExternalStore } from 'react';

const ITEM_MIN_WIDTH = 250 as const;

export const useSlider = ({ items }: { items: unknown[] }) => {
  const containerElementRef = useRef<HTMLUListElement>(null);
  const [_slideIndex, setSlideIndex] = useState(0);
  const slideIndex = Math.min(Math.max(0, _slideIndex), items.length - 1);

  const subscribe = useCallback((callback: () => void) => {
    const observer = new ResizeObserver(entries => {
      entries.forEach(callback);
    });
    if (containerElementRef.current) observer.observe(containerElementRef.current);
    return () => observer.disconnect();
  }, [])

  const calculateVisibleItemCount = useCallback(() => {
    const containerWidth = containerElementRef.current?.getBoundingClientRect().width ?? 0
    return Math.max(Math.floor(containerWidth / ITEM_MIN_WIDTH), 1);
  }, [])

  const visibleItemCount = useSyncExternalStore(subscribe, calculateVisibleItemCount)

  return {
    containerElementRef,
    setSlideIndex,
    slideIndex,
    visibleItemCount,
  };
};
