import { useState, useEffect } from "react";

export function usePagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [pageCache, setPageCache] = useState<Record<number, any>>({});

  const handlePageChange = (page: number) => {
    setIsPageChanging(true);
    setCurrentPage(page);
    // Scroll to top of products section
    document.getElementById('all-products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const cachePage = (page: number, data: any) => {
    if (data && !pageCache[page]) {
      setPageCache(prev => ({ ...prev, [page]: data }));
    }
  };

  const getDisplayData = (freshData: any) => {
    return pageCache[currentPage] || freshData;
  };

  const resetPageChanging = (isLoading: boolean) => {
    useEffect(() => {
      if (!isLoading) {
        setIsPageChanging(false);
      }
    }, [isLoading]);
  };

  const isLoadingCurrentPage = (isLoading: boolean) => {
    return isLoading || (isPageChanging && !pageCache[currentPage]);
  };

  return {
    currentPage,
    isPageChanging,
    pageCache,
    handlePageChange,
    cachePage,
    getDisplayData,
    resetPageChanging,
    isLoadingCurrentPage,
  };
}