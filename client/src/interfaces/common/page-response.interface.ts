export interface IPagedResponse<T> {
  items: T[];
  isLast: boolean;
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
