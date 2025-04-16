import { useState, useMemo, useCallback } from "react";

const DEFAULT_ROWS_PER_PAGE = 6;

export function useTablePagination<T>(
  allItems: T[],
  initialRowsPerPage: number = DEFAULT_ROWS_PER_PAGE
) {
  const [rowsPerPage] = useState(initialRowsPerPage);
  const [page, setPage] = useState(1);

  const pages = useMemo(
    () => Math.ceil(allItems.length / rowsPerPage) || 1,
    [allItems.length, rowsPerPage]
  );

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return allItems.slice(start, end);
  }, [page, allItems, rowsPerPage]);

  const onPageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= pages) {
        setPage(newPage);
      }
    },
    [pages]
  );

  const setPageExternal = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return {
    page,
    setPage: setPageExternal,
    pages,
    items,
    rowsPerPage,
    onPageChange,
  };
}
