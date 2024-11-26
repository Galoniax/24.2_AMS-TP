import axiosInterceptor from '../interceptor/axios-interceptor';
import { IBook } from '../interfaces/book.interface';
import { IPagedResponse } from '../interfaces/common/page-response.interface';

export const fetchAllBooks = async (
  pageNumber?: number,
  pageSize?: number,
  categoryId?: number,
): Promise<IPagedResponse<IBook>> => {
  const params: Record<string, number> = {};

  if (pageNumber !== undefined) params.pageNumber = pageNumber;
  if (pageSize !== undefined) params.pageSize = pageSize;
  if (categoryId !== undefined) params.categoryId = categoryId;

  const response = await axiosInterceptor.get(`/books`, { params });
  return response.data;
};

export const fetchBooksByCategoryId = async (id?: number): Promise<IBook[]> => {
  if (!id) return [];
  const response = await axiosInterceptor.get(`/books/catalog/${id}`);
  return response.data;
};

export const fetchBookById = async (id: number): Promise<IBook> => {
  const response = await axiosInterceptor.get(`/books/${id}`);
  return response.data;
};

export const createBook = async (newBook: IBook): Promise<IBook> => {
  const response = await axiosInterceptor.post('/books', newBook);
  return response.data;
};

export const updateBook = async (
  id: number,
  updatedBook: IBook,
): Promise<IBook> => {
  const response = await axiosInterceptor.put(`/books/${id}`, updatedBook);
  return response.data;
};

export const deleteBook = async (id: number): Promise<void> => {
  await axiosInterceptor.delete(`/books/${id}`);
};
