interface PaginatedResult<T> {
  Rows: T[];
  TotalCount: any;
}

class SearchFilter {
  page = 1;
  rowsPerPage = 10;
}

export { PaginatedResult, SearchFilter };
