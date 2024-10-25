import axiosInterceptor from '../interceptor/axios-interceptor';
import { IBook } from '../interfaces/book.interface';

export const fetchAllBooks = async (): Promise<IBook[]> => {
  const response = await axiosInterceptor.get('/books');
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
