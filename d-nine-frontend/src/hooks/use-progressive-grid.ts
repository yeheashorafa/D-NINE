'use client';

import { useState, useMemo, useCallback } from 'react';

export interface UseProgressiveGridOptions<T> {
  allItems: T[];
  batchSize?: number;
  resetDependencies?: unknown[];
}

export function useProgressiveGrid<T>({
  allItems,
  batchSize = 6,
  resetDependencies = [],
}: UseProgressiveGridOptions<T>) {
  const [visibleCount, setVisibleCount] = useState<number>(batchSize);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [prevDeps, setPrevDeps] = useState<unknown[]>(resetDependencies);

  // Reset batch count during render when filter/search dependencies change
  const depsChanged =
    resetDependencies.length !== prevDeps.length ||
    resetDependencies.some((dep, i) => !Object.is(dep, prevDeps[i]));

  if (depsChanged) {
    setPrevDeps(resetDependencies);
    setVisibleCount(batchSize);
  }

  const visibleItems = useMemo(() => {
    return allItems.slice(0, visibleCount);
  }, [allItems, visibleCount]);

  const hasMore = visibleCount < allItems.length;

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    // Minor asynchronous batch append for smooth UI feedback
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + batchSize, allItems.length));
      setIsLoadingMore(false);
    }, 350);
  }, [isLoadingMore, hasMore, batchSize, allItems.length]);

  return {
    visibleItems,
    hasMore,
    isLoadingMore,
    loadMore,
    totalCount: allItems.length,
    visibleCount,
  };
}
